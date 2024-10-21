import axios from 'axios';
import { useAuthStore } from './stores/AuthStore';

// Interceptors must be imported and initialised in main.js
export default axios.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.token;

    console.log('Interceptor token', token);
    console.log('Interceptor URL:', config.url);
    console.log(token)

    if (token && config.url !== '/login' && config.url !== '/register') { 
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle global errors (e.g., network errors, server errors)
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login)
      console.error('Unauthorized: Please log in.');
      // Optionally: Redirect to login page or display an error message
    }
    return Promise.reject(error);
  }
);