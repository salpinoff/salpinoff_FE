import { NextMiddleware, NextResponse } from 'next/server';

import { API_URLS } from '@api/api.constants';

import { decrypt } from 'src/app/(route)/api/auth/[...auth]/utils/crypto';
import tokenPrefix from 'src/app/(route)/api/auth/[...auth]/utils/token-prefix';

function withMonsterHandler(middleware: NextMiddleware): NextMiddleware {
  return async (request, event) => {
    const { url } = request;
    const targetUrl = ['/monster/produce'];

    if (!targetUrl.some((target) => url.includes(target))) {
      return middleware(request, event);
    }

    try {
      const accessToken = request.cookies.get(tokenPrefix('accessToken'));
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN_NAME}${API_URLS.MONSTER.GET_REF_MONSTER}`,
        {
          headers: {
            ...(accessToken && {
              Authorization: `Bearer ${decrypt(accessToken.value, process.env.AUTH_SECRET)}`,
            }),
          },
        },
      ).then((res) => res.json());

      return data
        ? NextResponse.redirect(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/`)
        : await middleware(request, event);
    } catch (error) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/`);
    }
  };
}

export default withMonsterHandler;
