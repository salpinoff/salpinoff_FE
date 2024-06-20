import { baseInstance } from '@api/api.config';

type Response = {
  accessToken: string;
};

type Session = Response & {
  status: 'authenticated' | 'unauthenticated';
};

const getSession = async () => {
  const path = '/api/auth/session';

  return baseInstance.get<Session>(path);
};

const getServerSession = async (headers: Record<string, string>) => {
  const path = '/api/auth/session';

  return baseInstance.get<Session>(path, {
    headers,
  });
};

const updateSession = () => {
  const path = '/api/auth/session';

  return baseInstance.post<Response>(path);
};

export { getSession, getServerSession, updateSession };
