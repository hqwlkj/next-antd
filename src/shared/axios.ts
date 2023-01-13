import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api-staging.pietrastudio.com',
  timeout: 10000,
});

instance.interceptors.response.use(
  (response) => {
    console.log('===NEXT_APP_ENV====', process.env.NEXT_APP_ENV);
    console.log('===NEXT_APP_API_HOST====', process.env.NEXT_APP_API_HOST);
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
