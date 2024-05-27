import { baseInstance } from '@api/api.config';

type Response = {
  accessToken: string;
};

type Session = Response & {
  status: 'authenticated' | 'unauthenticated';
};

const getSession = () => {
  const path = '/api/auth/session';

  return baseInstance.get<Session>(path);
};

const updateSession = () => {
  const path = '/api/auth/session';

  return baseInstance.post<Response>(path);
};

export { getSession, updateSession };
