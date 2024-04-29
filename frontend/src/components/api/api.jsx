import axios from 'axios';
import authService from './services/authservice';

const api = axios.create({
    baseURL: 'http://localhost:3000/', // Replace with your API base URL
    timeout: 5000,
    withCredentials: true, // Request timeout in milliseconds
  });
  api.interceptors.request.use(
    (config) => {
        const token = authService.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; 
          }
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
