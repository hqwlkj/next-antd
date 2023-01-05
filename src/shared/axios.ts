import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api-staging.pietrastudio.com',
  timeout: 10000,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
