import { apiInstance } from '@api/api.config';
import { TokenResponse } from '@api/schema/token';

const refreshTokenApi = (refreshToken: string) => {
  const path = '/api/v1/members/token/refresh';

  return apiInstance.post<TokenResponse>(path, { refreshToken });
};

export default refreshTokenApi;
