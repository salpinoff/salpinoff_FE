import { NextRequest, NextResponse } from 'next/server';

import { isAxiosError } from 'axios';

import qs from '@utils/qs';

import { providers } from '@constant/auth/providers';

import requestUserToken from '@api/auth/token';

import { AuthType, Providers } from '@type/auth';

import redirectResponse from './utils';

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
            await provider.authentication(code);

            const { data } = await requestUserToken({
              code,
              provider: providerId,
            });

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
        default:
          return NextResponse.next();
      }
    },
  };

  return handlers[method.toLowerCase()]();
};

export default authHandler;
