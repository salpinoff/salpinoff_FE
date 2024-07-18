import { NextRequest } from 'next/server';

import { TokenResponse } from '@api/schema/token';

import { getCookie } from 'src/app/(route)/api/auth/[...auth]/utils/cookie';
import { decrypt } from 'src/app/(route)/api/auth/[...auth]/utils/crypto';
import tokenPrefix from 'src/app/(route)/api/auth/[...auth]/utils/token-prefix';

const refreshUserToken = async (request: NextRequest, secret: string) => {
  const {
    [tokenPrefix('accessToken')]: access,
    [tokenPrefix('refreshToken')]: refresh,
  } = getCookie(
    [tokenPrefix('accessToken'), tokenPrefix('refreshToken')],
    request,
  );

  if (!access || !refresh) {
    throw new Error('토큰이 없습니다.');
  }

  const oldAccessToken = decrypt(access, secret);
  const oldRefreshToken = decrypt(refresh, secret);

  const { accessToken, refreshToken, code, username } = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN_NAME}/api/v1/members/token/refresh`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${oldAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: oldRefreshToken,
      }),
    },
  ).then((res) => res.json() as Promise<TokenResponse>);

  return { accessToken, refreshToken, code, username };
};

export default refreshUserToken;
