import { NextRequest, NextResponse } from 'next/server';

import { isAxiosError } from 'axios';

import qs from '@utils/qs';

import { providers } from '@constant/auth/providers';

import requestUserToken from '@api/auth/token/get-token';
import refreshTokenApi from '@api/auth/token/refresh-token';

import { AuthType, Providers } from '@type/auth';

import { deleteCookie, getCookie, setCookie } from '../utils/cookie';
import {
  createCSRFToken,
  decrypt,
  encrypt,
  verifyCSRFToken,
} from '../utils/crypto';
import isTimeRemain from '../utils/is-time-remain';
import { redirectResponse } from '../utils/redirect';
import tokenPrefix from '../utils/token-prefix';

type Props = {
  request: NextRequest;
  params: [AuthType] | [AuthType, Providers];
  secret: string;
};

const authHandler = ({ request, params, secret }: Props) => {
  const { method } = request;
  const [authType, providerId] = params;
  const nextUrl = request.nextUrl.clone();

  const handlers: Record<typeof method, () => Promise<NextResponse>> = {
    post: async () => {
      switch (authType) {
        case 'signin': {
          const [provider] = providers.filter(({ id }) => id === providerId);

          return provider
            ? NextResponse.json({ url: provider.authorization })
            : NextResponse.json(
                { errorMessage: '지원하지 않는 로그인 방식 입니다.' },
                { status: 403 },
              );
        }
        case 'signout': {
          nextUrl.pathname = '/signin';
          const respone = NextResponse.redirect(nextUrl, { status: 302 });

          return deleteCookie(
            [tokenPrefix('accessToken'), tokenPrefix('refreshToken')],
            respone,
          );
        }
        case 'session': {
          try {
            const {
              [tokenPrefix('accessToken')]: oldAccessToken,
              [tokenPrefix('refreshToken')]: oldRefreshToken,
            } = getCookie(
              [tokenPrefix('accessToken'), tokenPrefix('refreshToken')],
              request,
            );

            if (!oldAccessToken || !oldRefreshToken) {
              throw new Error('Token 이 없습니다.');
            }

            const decryptAccessToken = decrypt(oldAccessToken, secret);
            const decryptRefreshToken = decrypt(oldRefreshToken, secret);

            if (isTimeRemain(decryptAccessToken)) {
              return NextResponse.json({ accessToken: oldAccessToken });
            }

            const {
              data: { refreshToken, accessToken },
            } = await refreshTokenApi(decryptRefreshToken);

            const response = NextResponse.json({ accessToken });
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
              ],
              response,
            );
          } catch (error) {
            console.error('error in post /api/auth/signin', error);

            const response = isAxiosError(error)
              ? NextResponse.json(error.message, { status: 500 })
              : NextResponse.json(error, { status: 400 });

            return deleteCookie(
              [tokenPrefix('accessToken'), tokenPrefix('refreshToken')],
              response,
            );
          }
        }
        default:
          return NextResponse.next();
      }
    },
    get: async () => {
      switch (authType) {
        case 'signin': {
          const { code, error } = qs<'code' | 'error'>(request.url);

          try {
            if (!code) {
              throw new Error(error);
            }

            if (!providerId) {
              throw new Error('지원하지 않는 로그인 방식입니다');
            }

            const { data } = await requestUserToken({
              code,
              provider: providerId,
            });

            return redirectResponse(data, secret);
          } catch (thrownError) {
            const errorMessage = isAxiosError(thrownError)
              ? thrownError.message
              : thrownError;

            return NextResponse.redirect(
              `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/signin?error=${errorMessage}`,
            );
          }
        }
        case 'session': {
          const { [tokenPrefix('accessToken')]: accessToken } = getCookie(
            [tokenPrefix('accessToken')],
            request,
          );

          return NextResponse.json({
            status:
              (accessToken &&
                (isTimeRemain(decrypt(accessToken, secret))
                  ? 'authenticated'
                  : 'expried')) ||
              'unauthenticated',
            accessToken: decrypt(accessToken || '', secret),
          });
        }
        case 'csrf': {
          const { [tokenPrefix('csrfToken')]: csrfToken } = getCookie(
            [tokenPrefix('csrfToken')],
            request,
          );

          if (csrfToken && verifyCSRFToken(csrfToken, secret)) {
            return NextResponse.json({ csrfToken });
          }

          const response = NextResponse.json({});
          const cookies = [
            {
              key: tokenPrefix('csrfToken'),
              value: createCSRFToken(secret),
              proteced: true,
            },
          ];

          return setCookie(cookies, response);
        }
        default:
          return NextResponse.next();
      }
    },
  };

  return handlers[method.toLowerCase()]();
};

export default authHandler;
