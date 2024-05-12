import axiosInstance from '@api/api.config';

import { Providers } from '@type/auth';

interface Response {
  url: string;
}

type Props = {
  provider: Providers;
};

const requestSignIn = ({ provider }: Props) => {
  const path = `/api/auth/signin/${provider}`;

  return axiosInstance.post<Response>(path);
};

export default requestSignIn;
