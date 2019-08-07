import axios from 'axios';
import Config from 'react-native-config';

const api = axios.create({
  baseURL: `http://${Config.API_HOST}:5000`,
});

export default api;
