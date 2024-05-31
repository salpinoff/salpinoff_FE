import { NextResponse } from 'next/server';

import withAuthentification from './app/middlewares/withAuthentication';
import withSignUpHandle from './app/middlewares/withSignUpHandle';

export default withAuthentification(
  withSignUpHandle(() => NextResponse.next()),
);

export const config = {
  matcher: '/signup',
};
