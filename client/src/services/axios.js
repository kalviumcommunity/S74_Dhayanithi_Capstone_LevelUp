// src/services/axios.js
import axios from 'axios';

// Determine environment and set the appropriate base URL
// const isProduction = import.meta.env.VITE_NODE_ENV === 'production';
const isProduction = true;
console.log('Environment:', import.meta.env.VITE_NODE_ENV, 'isProduction:', isProduction);
const baseURL = isProduction 
  ? 'https://s74-dhayanithi-capstone-levelup.onrender.com/api'
  : 'http://localhost:5454/api';

const instance = axios.create({
  baseURL,
  withCredentials: true, // Ensures cookies are sent with every request
});

// Add request interceptor for debugging
instance.interceptors.request.use(config => {
  console.log(`🌐 API Request to: ${config.baseURL}${config.url}`);
  return config;
});

// Add response interceptor for error handling
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      console.error('Authentication error:', error.response.data);
      // Optionally redirect to login page if unauthorized
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;
