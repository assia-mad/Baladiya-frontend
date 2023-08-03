import axios from 'axios';
import { API_URL, getToken } from './src/config';

const apiInstance = axios.create({
  baseURL: API_URL, 
  timeout: 10000, 
});


apiInstance.interceptors.request.use(
  (config) => {

    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    console.log('request error',error);
  
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => {
    
    return response.data; 
  },
  (error) => {

    if (error.response) {
      console.error('Response Error:', error);
      console.error('Response Data:', error);
    } else if (error.request) {
      console.error('No Response:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
