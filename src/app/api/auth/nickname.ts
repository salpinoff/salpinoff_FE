import { apiInstance } from '@api/api.config';

const createUserName = async (username: string) => {
  const path = '/api/v1/members/my';

  return apiInstance.post(path, { username });
};

const modifyUserName = async (username: string) => {
  const path = '/api/v1/members/my';

  return apiInstance.put(path, { username });
};

export { createUserName, modifyUserName };
