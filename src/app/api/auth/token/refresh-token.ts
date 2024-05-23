import { apiInstance } from '@api/api.config';

interface Response {
  memberId: number;
  accessToken: string;
  refreshToken: string;
}

const refreshTokenApi = (refreshToken: string) => {
  const path = '/api/v1/members/token/refresh';

  return apiInstance.post<Response>(path, { refreshToken });
};

export default refreshTokenApi;
