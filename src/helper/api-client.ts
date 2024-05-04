import axios from 'axios';
import Config from 'react-native-config';

const API = axios.create({
  baseURL: Config.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//interceptor which calls custom enable loader function when the request is sent through axios
API.interceptors.request.use(async request => {
  return request;
});

//interceptor which calls custom disable loader function when the response is received.
API.interceptors.response.use(
  async response => {
    return response;
  },
  async error => {
    throw error;
  },
);

export default API;
