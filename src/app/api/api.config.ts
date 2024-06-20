import axios from 'axios';

/** axios */
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

/** fetch */
const createFetchInstance = (baseUrl: string, options?: RequestInit) => {
  const defaultHeaders: Record<string, string> = {};
  const fetchUrl = <T>(path: string, custom?: RequestInit) =>
    fetch(`${baseUrl}${path}`, {
      headers: { ...defaultHeaders },
      ...options,
      ...custom,
    }).then((res) => res.json() as Promise<T>);

  return {
    defaults: {
      headers: defaultHeaders,
    },
    async get<T>(url: string, custom?: RequestInit) {
      return fetchUrl<T>(url, { ...custom, method: 'get' });
    },
    async post<T>(url: string, custom?: RequestInit) {
      return fetchUrl<T>(url, { ...custom, method: 'post' });
    },
    async put<T>(url: string, custom?: RequestInit) {
      return fetchUrl<T>(url, { ...custom, method: 'put' });
    },
    async delete<T>(url: string, custom?: RequestInit) {
      return fetchUrl<T>(url, { ...custom, method: 'delete' });
    },
  };
};

const baseFetchInstance = createFetchInstance(
  process.env.NEXT_PUBLIC_DOMAIN_NAME,
);
const apiFetchInstance = createFetchInstance(
  `${process.env.NEXT_PUBLIC_API_DOMAIN_NAME}/api/v1`,
);

const setAuthHeader = (token: string) => {
  if (token) {
    apiInstance.defaults.headers.Authorization = `Bearer ${token}`;
    apiFetchInstance.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete apiInstance.defaults.headers.Authorization;
    delete apiFetchInstance.defaults.headers.Authorization;
  }
};

export {
  baseInstance,
  apiInstance,
  setAuthHeader,
  baseFetchInstance,
  apiFetchInstance,
};
