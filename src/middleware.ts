import chain from './app/middlewares/chain';
import withAuthentification from './app/middlewares/factory/withAuthentication';
import withMonsterHandler from './app/middlewares/factory/withMonsterHandler';
import withSignUpHandle from './app/middlewares/factory/withSignUpHandle';

const middlewares = [
  withAuthentification,
  withSignUpHandle,
  withMonsterHandler,
];

export default chain(middlewares);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - image
     * - favicon.ico (favicon file)
     * - monster/\\S+/share (share page)
     */
    '/((?!api|_next/static|_next/image|image|favicon.ico|monster/\\S+/share|onboarding).*)',
  ],
};
