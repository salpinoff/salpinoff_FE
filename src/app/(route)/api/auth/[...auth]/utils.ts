import { NextResponse } from 'next/server';

import { type Response as TypeResponse } from '@api/auth/token/get-token';

const setCookie = (
  response: NextResponse,
  { accessToken, refreshToken }: { refreshToken: string; accessToken: string },
) => {
  const cookies = [
    {
      key: 'accessToken',
      value: accessToken,
    },
    {
      key: 'refreshToken',
      value: refreshToken,
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

const redirectResponse = ({
  code,
  username,
  accessToken,
  refreshToken,
}: TypeResponse) => {
  const destinationUrl =
    (code === 100 && `/signUp?code=${code}`) ||
    (code === 102 && `/signUp?code=${code}&user=${username}`) ||
    '/';

  const response = NextResponse.redirect(destinationUrl, { status: 302 });
  return setCookie(response, { accessToken, refreshToken });
};

export { redirectResponse, setCookie };
