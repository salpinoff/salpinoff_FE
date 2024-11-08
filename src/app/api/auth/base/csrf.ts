import { baseInstance } from '@api/api.config';
import { API_URLS } from '@api/api.constants';

const getCsrfToken = () => {
  const path = API_URLS.AUTH.BASE.CSRF;

  return baseInstance.get(path);
};

export { getCsrfToken };
