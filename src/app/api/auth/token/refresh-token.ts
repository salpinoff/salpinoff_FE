import { apiInstance } from '@api/api.config';
import { API_URLS } from '@api/api.constants';
import { TokenResponse } from '@api/schema/token';

const refreshTokenApi = (refreshToken: string) => {
  const path = API_URLS.AUTH.API.REFRESH_TOKEN;

  return apiInstance.post<TokenResponse>(path, { refreshToken });
};

export default refreshTokenApi;
