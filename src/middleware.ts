import { type NextMiddleware, NextResponse } from 'next/server';

import chain from './app/middlewares/chain';
import withAuthentification from './app/middlewares/factory/withAuthentication';
import withMonsterHandler from './app/middlewares/factory/withMonsterHandler';
import withSignUpHandle from './app/middlewares/factory/withSignUpHandle';
import { USE_MOCK } from './mocks/config';

const middlewares = [
  withAuthentification,
  withSignUpHandle,
  withMonsterHandler,
];

// Demo mode: the auth/monster middlewares all hit the (expired) backend to
// refresh tokens and gate routes. Skip the whole chain so every page renders as
// the signed-in demo user. Reconnect by unsetting NEXT_PUBLIC_USE_MOCK.
const middleware: NextMiddleware = USE_MOCK
  ? () => NextResponse.next()
  : chain(middlewares);

export default middleware;

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
