import { NextRequest } from 'next/server';

import { AuthType, Providers } from '@type/auth';

import authHandler from './handler';

type Params = {
  auth: [AuthType] | [AuthType, Providers];
};

const GET = async (request: NextRequest, context: { params: Params }) => {
  const { auth } = context.params;

  return authHandler({
    request,
    params: auth,
    secret: process.env.AUTH_SECRET,
  });
};

const POST = async (request: NextRequest, context: { params: Params }) => {
  const { auth } = context.params;

  return authHandler({
    request,
    params: auth,
    secret: process.env.AUTH_SECRET,
  });
};

export { POST, GET };
