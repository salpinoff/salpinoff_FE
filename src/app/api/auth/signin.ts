import { baseInstance } from '@api/api.config';
import { API_URLS } from '@api/api.constants';

import { Providers } from '@type/auth';

interface Response {
  url: string;
}

type Props = {
  provider: Providers;
};

const requestSignIn = ({ provider }: Props) => {
  const path = API_URLS.AUTH.SIGNIN[provider];

  return baseInstance.post<Response>(path);
};

export default requestSignIn;
