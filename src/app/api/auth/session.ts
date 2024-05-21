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

export { getSession };
