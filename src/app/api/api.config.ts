import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { getQueryClient } from '@utils/query/get-query-client';

import { API_URLS } from './api.constants';
import { Session } from './schema/token';

/** axios */
const createInstance = (baseURL: string) => {
  return axios.create({
    baseURL,
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const baseInstance = createInstance(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}`);
const apiInstance = createInstance(
  `${process.env.NEXT_PUBLIC_API_DOMAIN_NAME}/api/v1`,
);

const setAuthHeader = (token: string) => {
  if (token) {
    apiInstance.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete apiInstance.defaults.headers.Authorization;
  }
};

apiInstance.interceptors.request.use(async (request) => {
  const {
    REFRESH_TOKEN,
    GET_TOKEN: { kakao: KAKAO_LOGIN },
  } = API_URLS.AUTH.API;

  const reqeustUrl = request.url || '';
  const withOutAuthHeader = [REFRESH_TOKEN, KAKAO_LOGIN];

  const isWithOustUrl = withOutAuthHeader.some((url) =>
    url.includes(reqeustUrl),
  );

  if (isWithOustUrl) {
    delete request.headers.Authorization;
  }

  if (!isWithOustUrl && !request.headers.Authorization) {
    const {
      data: { accessToken },
    } = await baseInstance.get<Session>(API_URLS.AUTH.BASE.SESSION);

    request.headers.Authorization = `Bearer ${accessToken}`;
    setAuthHeader(accessToken);
  }

  return request;
});

apiInstance.interceptors.response.use(
  (respone) => respone,
  async (error: AxiosError) => {
    const queryClient = getQueryClient();
    const originalRequest: AxiosRequestConfig & { retry?: boolean } =
      error.config || { retry: false };

    const isExpireError =
      error.response?.status === 401 && !originalRequest.retry;

    if (isExpireError) {
      originalRequest.retry = true;

      try {
        const {
          data: { accessToken },
        } = await baseInstance.post<{ accessToken: string }>(
          API_URLS.AUTH.BASE.SESSION,
        );

        queryClient.invalidateQueries({ queryKey: ['authToken'] });
        setAuthHeader(accessToken);

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${accessToken}`,
        };

        return await apiInstance(originalRequest);
      } catch (refreshError) {
        await baseInstance.post(API_URLS.AUTH.BASE.SIGNOUT);

        setAuthHeader('');
        window.location.href = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/signin`;

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export { baseInstance, apiInstance, setAuthHeader };
