import axios from 'axios';
import Config from 'react-native-config';

import { store } from '../store';
import { signOut } from '../store/modules/auth/actions';

const api = axios.create({
  baseURL: `http://${Config.API_HOST}:5000`,
});

api.interceptors.response.use(null, err => {
  const {
    status,
    data: { error },
  } = err.response;

  if (status === 401 && error === 'Invalid Token') {
    store.dispatch(signOut());
  }
  return Promise.reject(err);
});

export default api;
