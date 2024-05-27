import { NextRequest, NextResponse } from 'next/server';

import { isAxiosError } from 'axios';

import jwtParse from '@utils/jwt-parse';
import qs from '@utils/qs';

import { providers } from '@constant/auth/providers';

import requestUserToken from '@api/auth/token/get-token';
import refreshTokenApi from '@api/auth/token/refresh-token';

import { AuthType, Providers } from '@type/auth';

import { redirectResponse, setCookie } from './utils/redirect';

type Props = {
  request: NextRequest;
  params: [AuthType] | [AuthType, Providers];
};

const authHandler = ({ request, params }: Props) => {
  const { method } = request;
  const [authType, providerId] = params;

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
          const respone = NextResponse.redirect('/signin', { status: 302 });
          const cookiesName = ['accessToken', 'refreshToken'];

          cookiesName.map((name) => {
            return respone.cookies.delete(name);
          });

          return respone;
        }
        case 'session': {
          try {
            const refreshCookie = request.cookies.get('refreshToken');
            const accessCookie = request.cookies.get('accessToken');

            if (!refreshCookie || !accessCookie) {
              throw new Error('Token 이 없습니다.');
            }

            const { exp } = jwtParse(accessCookie.value);
            const timeRemaing =
              exp - (Math.floor(new Date().getTime() / 1000) + 10 * 60);

            if (timeRemaing > 0) {
              return NextResponse.json({ accessToken: accessCookie.value });
            }

            const {
              data: { refreshToken, accessToken },
            } = await refreshTokenApi(refreshCookie.value);

            const response = NextResponse.json({ accessToken });
            return setCookie(response, { accessToken, refreshToken });
          } catch (error) {
            const response = isAxiosError(error)
              ? NextResponse.json(error.message, { status: 500 })
              : NextResponse.json(error, { status: 400 });

            const cookiesName = ['accessToken', 'refreshToken'];
            cookiesName.map((name) => {
              return response.cookies.delete(name);
            });

            return response;
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

            return redirectResponse(data);
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
          const accessTokenCookie = request.cookies.get('accessToken');

          return NextResponse.json({
            status: accessTokenCookie ? 'authenticated' : 'unauthenticated',
            accessToken: accessTokenCookie ? accessTokenCookie.value : '',
          });
        }
        default:
          return NextResponse.next();
      }
    },
  };

  return handlers[method.toLowerCase()]();
};

export default authHandler;
