// src/services/axios.js
import axios from 'axios';

// Determine environment and set the appropriate base URL
const isProduction = import.meta.env.MODE === 'production';
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

export default instance;
