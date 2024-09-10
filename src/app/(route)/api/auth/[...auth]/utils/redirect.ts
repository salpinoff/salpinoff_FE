import { NextResponse } from 'next/server';

import type { TokenResponse } from '@api/schema/token';

import { setCookie } from './cookie';
import { encrypt } from './crypto';
import tokenPrefix from './token-prefix';

const redirectResponse = (
  {
    code,
    username,
    accessToken,
    refreshToken,
    memberId,
    createdAt,
  }: TokenResponse,
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

  return setCookie(
    [
      {
        key: tokenPrefix('accessToken'),
        value: encrypt(accessToken, secret),
        proteced: true,
      },
      {
        key: tokenPrefix('refreshToken'),
        value: encrypt(refreshToken, secret),
        proteced: true,
      },
      {
        key: 'userInfo',
        value: encrypt(
          JSON.stringify({ memberId, username, createdAt }),
          secret,
        ),
        proteced: true,
      },
    ],
    response,
  );
};

export { redirectResponse };
