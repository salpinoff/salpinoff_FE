import axiosInstance from '@api/api.config';

type AuthResponse = {
  token_Type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
};

const requestAuthentication = async ({
  path,
  code,
  clientId,
  redirectUrl,
}: {
  path: string;
  code: string;
  clientId: string;
  redirectUrl: string;
}) => {
  return axiosInstance.post<AuthResponse>(
    path,
    {
      code,
      client_id: clientId,
      redirect_uri: redirectUrl,
      grant_type: 'authorization_code',
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
};

const requestKakaoUserInfo = async ({
  path,
  accessToken,
}: {
  path: string;
  accessToken: string;
}) => {
  return axiosInstance.get<{ id: string }>(path, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });
};

export { requestAuthentication, requestKakaoUserInfo };
