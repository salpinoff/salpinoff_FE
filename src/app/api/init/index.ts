import { baseInstance } from '@api/api.config';
import { API_URLS } from '@api/api.constants';

const init = async () => {
  return baseInstance.get(API_URLS.INIT);
};

export { init };
