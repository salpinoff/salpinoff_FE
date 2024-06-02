import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from 'next/server';

import { TokenResponse } from '@api/schema/token';

import {
  deleteCookie,
  getCookie,
  setCookie,
} from '../(route)/api/auth/[...auth]/utils/cookie';
import { decrypt, encrypt } from '../(route)/api/auth/[...auth]/utils/crypto';
import tokenPrefix from '../(route)/api/auth/[...auth]/utils/token-prefix';

const refreshUserToken = async (request: NextRequest, secret: string) => {
  const { accessToken: access, refreshToken: refresh } = getCookie(
    [tokenPrefix('accessToken'), tokenPrefix('refreshToken')],
    request,
  );

  if (!access || !refresh) {
    throw new Error('토큰이 없습니다.');
  }

  const oldAccessToken = decrypt(access, secret);
  const oldRefreshToken = decrypt(refresh, secret);

  const { accessToken, refreshToken, code, username } = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN_NAME}/api/v1/members/token/refresh`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${oldAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: oldRefreshToken,
      }),
    },
  ).then((res) => res.json() as Promise<TokenResponse>);

  return { accessToken, refreshToken, code, username };
};

function withSignUpHandle(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const { url } = request;

    if (!url.includes('/signup')) {
      return middleware(request, event);
    }

    try {
      const secret = process.env.AUTH_SECRET;
      const { accessToken, refreshToken, code, username } =
        await refreshUserToken(request, secret);

      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.search =
        (code === 100 && `code${code}`) ||
        (code === 101 && `code=${code}&user=${username}`) ||
        '/';

      const response =
        url === rewriteUrl.href
          ? NextResponse.next()
          : NextResponse.redirect(rewriteUrl);

      return setCookie(
        [
          {
            key: tokenPrefix('accessToken'),
            value: encrypt(accessToken, secret),
            proteced: true,
          },
          {
            key: tokenPrefix('refreshToken'),
            value: encrypt(refreshToken, secret),
            proteced: true,
          },
        ],
        response,
      );
    } catch (err) {
      const response = NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/signin`,
      );

      return deleteCookie(
        [tokenPrefix('accessToken'), tokenPrefix('refreshToken')],
        response,
      );
    }
  };
}

export default withSignUpHandle;
