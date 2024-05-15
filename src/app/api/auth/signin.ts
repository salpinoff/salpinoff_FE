import ROUTER from '@constant/api.router';

import { baseInstance } from '@api/api.config';

import { Providers } from '@type/auth';

interface Response {
  url: string;
}

type Props = {
  provider: Providers;
};

const requestSignIn = ({ provider }: Props) => {
  const path = ROUTER.AUTH.SIGNIN[provider];

  return baseInstance.post<Response>(path);
};

export default requestSignIn;
