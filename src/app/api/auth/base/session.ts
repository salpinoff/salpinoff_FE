import { baseInstance } from '@api/api.config';
import { API_URLS } from '@api/api.constants';

type Response = {
  accessToken: string;
};

type Session = Response & {
  status: 'authenticated' | 'unauthenticated';
};

const getSession = async () => {
  const path = API_URLS.AUTH.BASE.SESSION;

  return baseInstance.get<Session>(path);
};

const getServerSession = async (headers: Record<string, string>) => {
  const path = API_URLS.AUTH.BASE.SESSION;

  return baseInstance.get<Session>(path, {
    headers,
  });
};

const updateSession = () => {
  const path = API_URLS.AUTH.BASE.SESSION;

  return baseInstance.post<Response>(path);
};

export { getSession, getServerSession, updateSession };
