import { NextResponse } from 'next/server';

import { type Response as TypeResponse } from '@api/auth/token/get-token';

import { encrypt } from './crypto';

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
      key: 'accessToken',
      value: encrypt(accessToken, secret),
    },
    {
      key: 'refreshToken',
      value: encrypt(refreshToken, secret),
    },
  ];

  cookies.map(({ key, value }) => {
    return response.cookies.set(key, value, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });
  });

  return response;
};

const redirectResponse = (
  { code, username, accessToken, refreshToken }: TypeResponse,
  secret: string,
) => {
  const destinationUrl =
    (code === 100 && `/signup?code=${code}`) ||
    (code === 102 && `/signup?code=${code}&user=${username}`) ||
    '/';

  const response = NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_DOMAIN_NAME}${destinationUrl}`,
    { status: 302 },
  );
  return setCookie(response, { accessToken, refreshToken, secret });
};

export { redirectResponse, setCookie };
