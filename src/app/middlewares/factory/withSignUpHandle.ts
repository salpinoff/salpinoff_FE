import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from 'next/server';

import {
  deleteCookie,
  setCookie,
} from 'src/app/(route)/api/auth/[...auth]/utils/cookie';
import { encrypt } from 'src/app/(route)/api/auth/[...auth]/utils/crypto';
import tokenPrefix from 'src/app/(route)/api/auth/[...auth]/utils/token-prefix';

import refreshUserToken from '../utils/refresh-token';

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
        throw new Error('No AccessToken');
      }

      const redirect = request.nextUrl.clone();
      redirect.pathname = code === 102 ? '/' : redirect.pathname;
      redirect.search =
        (code === 100 && `code=${code}`) ||
        (code === 101 && `code=${code}&user=${username}`) ||
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
