import chain from './app/middlewares/chain';
import withAuthentification from './app/middlewares/factory/withAuthentication';
import withSignUpHandle from './app/middlewares/factory/withSignUpHandle';

const middlewares = [withAuthentification, withSignUpHandle];

export default chain(middlewares);

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
