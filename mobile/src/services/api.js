import axios from 'axios';
import api_url from '../enviroment';

const api = axios.create({
  baseURL: `http://${api_url}:5000`,
});

export default api;
