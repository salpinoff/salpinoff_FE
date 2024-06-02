import ROUTER from '@constant/api.router';

import { apiInstance } from '@api/api.config';
import type { TokenResponse } from '@api/schema/token';

import type { Providers } from '@type/auth';

type Props = {
  code: string;
  provider: Providers;
};

const requestUserToken = ({ code, provider }: Props) => {
  const path = ROUTER.AUTH.INITIAL_TOKEN[provider];

  return apiInstance.post<TokenResponse>(path, { code });
};

export default requestUserToken;
