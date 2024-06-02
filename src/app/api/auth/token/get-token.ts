import { apiInstance } from '@api/api.config';
import { API_URLS } from '@api/api.constants';
import type { TokenResponse } from '@api/schema/token';

import type { Providers } from '@type/auth';

type Props = {
  code: string;
  provider: Providers;
};

const requestUserToken = ({ code, provider }: Props) => {
  const path = API_URLS.AUTH.INITIAL_TOKEN[provider];

  return apiInstance.post<TokenResponse>(path, { code });
};

export default requestUserToken;
