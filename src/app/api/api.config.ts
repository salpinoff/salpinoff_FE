import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.DOMAIN_NAME,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
