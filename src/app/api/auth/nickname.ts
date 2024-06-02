import ROUTER from '@constant/api.router';

import { apiInstance } from '@api/api.config';

const path = ROUTER.AUTH.USER_NICKNAME;

const createUserName = async (username: string) => {
  return apiInstance.post(path, { username });
};

const modifyUserName = async (username: string) => {
  return apiInstance.put(path, { username });
};

export { createUserName, modifyUserName };
