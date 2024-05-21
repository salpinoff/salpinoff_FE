import { NextRequest, NextResponse } from 'next/server';

import { isAxiosError } from 'axios';

import qs from '@utils/qs';

import { providers } from '@constant/auth/providers';

import requestUserToken from '@api/auth/token/get-token';

import { AuthType, Providers } from '@type/auth';

import { redirectResponse } from './utils';

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
          const respone = NextResponse.redirect('/signIn', { status: 302 });
          const cookiesName = ['accessToken', 'refreshToken'];

          cookiesName.map((name) => {
            return respone.cookies.delete(name);
          });

          return respone;
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

            const [provider] = providers.filter(({ id }) => id === providerId);
            const [{ data }] = await Promise.all([
              requestUserToken({ code, provider: providerId }),
              provider.authentication(code),
            ]);

            return redirectResponse(data);
          } catch (thrownError) {
            const errorMessage = isAxiosError(thrownError)
              ? thrownError.message
              : error;

            return NextResponse.redirect(
              `${process.env.DOMAIN_NAME}/signin?error=${errorMessage}`,
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
