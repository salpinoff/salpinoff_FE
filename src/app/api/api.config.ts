import axios from 'axios';

const createInstance = (baseURL: string) => {
  return axios.create({
    baseURL,
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const baseInstance = createInstance(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}`);
const apiInstance = createInstance(
  `${process.env.NEXT_PUBLIC_API_DOMAIN_NAME}/api/v1`,
);

const setAuthHeader = (token: string) => {
  if (token) {
    apiInstance.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete apiInstance.defaults.headers.Authorization;
  }
};

export { baseInstance, apiInstance, setAuthHeader };
