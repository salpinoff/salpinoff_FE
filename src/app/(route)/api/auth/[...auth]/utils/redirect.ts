import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextResponse } from 'next/server';

import type { TokenResponse } from '@api/schema/token';

import { encrypt } from './crypto';
import tokenPrefix from './token-prefix';

const setCookie = (
  response: NextResponse,
  {
    secret,
    accessToken,
    refreshToken,
  }: { refreshToken: string; accessToken: string; secret: string },
) => {
  const cookies = [
    {
      key: tokenPrefix('accessToken'),
      value: encrypt(accessToken, secret),
    },
    {
      key: tokenPrefix('refreshToken'),
      value: encrypt(refreshToken, secret),
    },
  ];

  cookies.map(({ key, value }) => {
    const cookieOptions: Partial<ResponseCookie> =
      process.env.NODE_ENV !== 'development'
        ? {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            domain: process.env.NEXT_PUBLIC_DOMAIN_NAME,
          }
        : {};

    return response.cookies.set(key, value, cookieOptions);
  });

  return response;
};

const redirectResponse = (
  { code, username, accessToken, refreshToken }: TokenResponse,
  secret: string,
) => {
  const destinationUrl =
    (code === 100 && `/signup?code=${code}`) ||
    (code === 101 && `/signup?code=${code}&user=${username}`) ||
    '/';

  const response = NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_DOMAIN_NAME}${destinationUrl}`,
    { status: 302 },
  );

  return setCookie(response, { accessToken, refreshToken, secret });
};

export { redirectResponse, setCookie };
