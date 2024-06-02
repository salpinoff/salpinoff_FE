import ROUTER from '@constant/api.router';

import { apiInstance } from '@api/api.config';
import { TokenResponse } from '@api/schema/token';

const refreshTokenApi = (refreshToken: string) => {
  const path = ROUTER.AUTH.REFRESH_TOKEN;

  return apiInstance.post<TokenResponse>(path, { refreshToken });
};

export default refreshTokenApi;
