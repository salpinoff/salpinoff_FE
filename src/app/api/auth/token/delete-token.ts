import { apiInstance } from '@api/api.config';
import { API_URLS } from '@api/api.constants';

const requestDeleteToken = () => {
  const path = API_URLS.AUTH.API.DELETE_TOKEN;

  return apiInstance.post(path);
};

export default requestDeleteToken;
