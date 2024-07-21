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

  console.log('request to get token', path);

  return apiInstance.post<TokenResponse>(path, { code });
};

export default requestUserToken;
