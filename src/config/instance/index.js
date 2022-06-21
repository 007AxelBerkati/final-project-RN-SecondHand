/* eslint-disable camelcase */
import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { Store } from '../../redux';

const headers = {};

const instance = axios.create({
  baseURL: 'https://market-final-project.herokuapp.com',
  timeout: 1000,
  headers,
});

instance.interceptors.request.use(
  (config) => {
    const store = Store.getState();
    const { access_token } = store.dataLogin.data;
    if (access_token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = access_token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default instance;
