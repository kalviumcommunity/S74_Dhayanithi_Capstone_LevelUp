// src/services/axios.js
import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:5454/api',
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  withCredentials: true, // Ensures cookies are sent with every request
});

export default instance;
