import { apiInstance } from '@api/api.config';
import { API_URLS } from '@api/api.constants';

const path = API_URLS.AUTH.API.USER_NICKNAME;

const createUserName = async (username: string) => {
  return apiInstance.post(path, { username });
};

const modifyUserName = async (username: string) => {
  return apiInstance.put(path, { username });
};

export { createUserName, modifyUserName };
