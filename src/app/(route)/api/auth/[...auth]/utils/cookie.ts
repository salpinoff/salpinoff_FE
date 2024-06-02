import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextRequest, NextResponse } from 'next/server';

const getCookie = (keys: string[], request: NextRequest) => {
  const { cookies } = request;
  const result: Record<(typeof keys)[number], string | undefined> = {};

  keys.forEach((key) => {
    result[key] = cookies.get(key)?.value || undefined;
  });

  return { ...result };
};

const setCookie = (
  pairs: { key: string; value: string; proteced?: boolean }[],
  response: NextResponse,
) => {
  const { cookies } = response;
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

  pairs.forEach(({ key, value, proteced }) => {
    cookies.set(key, value, proteced ? cookieOptions : {});
  });

  return response;
};

const deleteCookie = (keys: string[], response: NextResponse) => {
  keys.map((cookie) => {
    return response.cookies.delete(cookie);
  });

  return response;
};

export { getCookie, setCookie, deleteCookie };
