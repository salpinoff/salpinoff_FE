import { NextRequest, NextResponse } from 'next/server';

import { AuthType, Providers } from '@type/auth';

import { getCookie } from '../utils/cookie';
import { verifyCSRFToken } from '../utils/crypto';
import tokenPrefix from '../utils/token-prefix';

type Params = {
  auth: [AuthType] | [AuthType, Providers];
};

type Route = (
  request: NextRequest,
  context: { params: Params },
) => Promise<NextResponse>;

const withCsrfToken = (route: Route): Route => {
  return async (request, context) => {
    const { auth } = context.params;
    const [authType] = auth;

    const { csrfToken } = getCookie([tokenPrefix('csrfToken')], request);
    const isVerified =
      csrfToken && verifyCSRFToken(csrfToken, process.env.AUTH_SECRET);

    if (authType !== 'csrf' && !isVerified) {
      return NextResponse.json(
        { error: 'csrfToken is required' },
        { status: 400 },
      );
    }

    return route(request, context);
  };
};

export default withCsrfToken;
