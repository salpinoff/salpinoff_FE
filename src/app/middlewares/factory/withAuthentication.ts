import { cookies } from 'next/headers';
import {
  type NextFetchEvent,
  type NextMiddleware,
  type NextRequest,
  NextResponse,
} from 'next/server';

import tokenPrefix from 'src/app/(route)/api/auth/[...auth]/utils/token-prefix';

function withAuthentification(middleware: NextMiddleware) {
  const withAuthList = ['/signup', '/'];
  const withoutAuthList = ['/signin'];

  return async (request: NextRequest, event: NextFetchEvent) => {
    const url = request.nextUrl.clone();

    const { pathname } = url;
    const isWithAuthUrl = withAuthList.some((path) => pathname.includes(path));
    const isWithoutAuthUrl = withoutAuthList.some((path) =>
      pathname.includes(path),
    );

    if (!isWithAuthUrl && !isWithoutAuthUrl) {
      return middleware(request, event);
    }

    const accessToken = request.cookies.get(tokenPrefix('accessToken'));
    const isLogin = Boolean(accessToken && accessToken.value);
    const isInit = cookies().has('gbmon-init');

    if (isWithoutAuthUrl) {
      if (isLogin) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/`);
      }

      return isInit
        ? NextResponse.next()
        : NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/onboarding`,
          );
    }

    return isLogin
      ? middleware(request, event)
      : NextResponse.redirect(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/signin`);
  };
}

export default withAuthentification;
