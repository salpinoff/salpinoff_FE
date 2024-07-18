import { NextMiddleware, NextResponse } from 'next/server';

import { API_URLS } from '@api/api.constants';
import { GetMonsterRefResponse } from '@api/monster/types';

import { setCookie } from 'src/app/(route)/api/auth/[...auth]/utils/cookie';
import { encrypt } from 'src/app/(route)/api/auth/[...auth]/utils/crypto';
import tokenPrefix from 'src/app/(route)/api/auth/[...auth]/utils/token-prefix';

import refreshUserToken from '../utils/refresh-token';

function withMonsterHandler(middleware: NextMiddleware): NextMiddleware {
  return async (request, event) => {
    const { url } = request;
    const targetUrl = ['/monster/produce'];

    if (!targetUrl.some((target) => url.includes(target))) {
      return middleware(request, event);
    }

    try {
      const secret = process.env.AUTH_SECRET;
      const { accessToken, refreshToken } = await refreshUserToken(
        request,
        secret,
      );

      const headers = {
        ...(accessToken && {
          Authorization: `Bearer ${accessToken}`,
        }),
      };

      const data = (await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN_NAME}/api/v1${API_URLS.MONSTER.GET_REF_MONSTER}`,
        { headers },
      ).then((res) => res.json())) as
        | GetMonsterRefResponse
        | { code: string; message: string };

      if ('code' in data) {
        throw new Error(data.code);
      }

      const response =
        data.currentInteractionCount !== data.interactionCount
          ? NextResponse.redirect(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/`)
          : NextResponse.next();

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
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/`);
    }
  };
}

export default withMonsterHandler;
