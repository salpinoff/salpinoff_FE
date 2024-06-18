import { NextResponse } from 'next/server';

import withAuthentification from './app/middlewares/withAuthentication';
import withSignUpHandle from './app/middlewares/withSignUpHandle';

export default withAuthentification(
  withSignUpHandle(() => NextResponse.next()),
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - share (share page)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|share).*)',
  ],
};
