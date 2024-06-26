import axios from 'axios';
import { Cookies } from 'react-cookie';
import authService from './services/authservice';
const api = axios.create({
    baseURL: 'http://localhost:3000/', // Replace with your API base URL
    timeout: 10000,
    withCredentials: true, // Request timeout in milliseconds
  });
  api.interceptors.request.use(
    (config) => {
    
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  export default api;
