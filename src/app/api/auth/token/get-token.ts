'use server';

import { converHeaderToRecord } from '@utils/server/convert-header-to-record';

import { apiInstance } from '@api/api.config';
import { API_URLS } from '@api/api.constants';
import type { TokenResponse } from '@api/schema/token';

import type { Providers } from '@type/auth';

type Props = {
  code: string;
  provider: Providers;
};

const requestUserToken = ({ code, provider }: Props) => {
  const path = API_URLS.AUTH.API.GET_TOKEN[provider];
  const requestHeader = converHeaderToRecord();

  return apiInstance.post<TokenResponse>(
    path,
    { code },
    { headers: requestHeader },
  );
};

export default requestUserToken;
