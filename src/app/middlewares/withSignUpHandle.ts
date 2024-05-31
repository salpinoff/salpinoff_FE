import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from 'next/server';

import { TokenResponse } from '@api/schema/token';

import { decrypt } from '../(route)/api/auth/[...auth]/utils/crypto';
import { setCookie } from '../(route)/api/auth/[...auth]/utils/redirect';
import tokenPrefix from '../(route)/api/auth/[...auth]/utils/token-prefix';

function withSignUpHandle(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const { url } = request;

    if (!url.includes('/signup')) {
      return middleware(request, event);
    }

    try {
      const refreshCookie = request.cookies.get(tokenPrefix('refreshToken'))!;
      const accessCookie = request.cookies.get(tokenPrefix('accessToken'))!;

      const secret = process.env.AUTH_SECRET;
      const oldAccessToken = decrypt(accessCookie.value, secret);
      const oldRefreshToken = decrypt(refreshCookie.value, secret);

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

      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.search =
        (code === 100 && `code${code}`) ||
        (code === 101 && `code=${code}&user=${username}`) ||
        '/';

      const response = NextResponse.rewrite(rewriteUrl);
      return setCookie(response, {
        secret: process.env.AUTH_SECRET,
        accessToken,
        refreshToken,
      });
    } catch (err) {
      const respone = NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/signin`,
      );

      const cookies = [tokenPrefix('accessToken'), tokenPrefix('refreshToken')];
      cookies.map((cookie) => {
        return respone.cookies.delete(cookie);
      });

      return respone;
    }
  };
}

export default withSignUpHandle;
