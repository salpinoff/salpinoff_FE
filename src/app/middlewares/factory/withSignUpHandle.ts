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
} from 'src/app/(route)/api/auth/[...auth]/utils/cookie';
import {
  decrypt,
  encrypt,
} from 'src/app/(route)/api/auth/[...auth]/utils/crypto';
import tokenPrefix from 'src/app/(route)/api/auth/[...auth]/utils/token-prefix';

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

      if (!accessToken) {
        throw new Error('No AccessTOken');
      }

      const redirect = request.nextUrl.clone();
      // redirect.pathname = code === 102 ? '/' : redirect.pathname;
      redirect.search =
        (code === 100 && `code=${code}`) ||
        (code === 101 && `code=${code}&user=${username}`) ||
        (code === 102 && `code=${code}&user=${username}`) ||
        '';

      const response =
        url === redirect.href
          ? NextResponse.next()
          : NextResponse.redirect(redirect);

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
