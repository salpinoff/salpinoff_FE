import {
  type NextFetchEvent,
  type NextMiddleware,
  type NextRequest,
  NextResponse,
} from 'next/server';

import tokenPrefix from '../(route)/api/auth/[...auth]/utils/token-prefix';

function withAuthentification(middleware: NextMiddleware) {
  const withAuthList = ['/signup'];

  return async (request: NextRequest, event: NextFetchEvent) => {
    const { url } = request;
    const isWithAuthUrl = withAuthList.some((path) => url.includes(path));

    if (!isWithAuthUrl) {
      return middleware(request, event);
    }

    const accessToken = request.cookies.get(tokenPrefix('accessToken'));
    const isLogin = Boolean(accessToken && accessToken.value);

    return isLogin
      ? middleware(request, event)
      : NextResponse.redirect(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/signin`);
  };
}

export default withAuthentification;
