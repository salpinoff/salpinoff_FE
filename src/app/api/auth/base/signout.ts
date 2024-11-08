import { baseInstance } from '@api/api.config';
import { API_URLS } from '@api/api.constants';

const requestSignOut = () => {
  const path = API_URLS.AUTH.BASE.SIGNOUT;

  return baseInstance.post(path);
};

export default requestSignOut;
