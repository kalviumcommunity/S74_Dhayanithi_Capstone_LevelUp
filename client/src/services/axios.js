// src/services/axios.js
import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:5454/api',
  // baseURL: `https://s74-dhayanithi-capstone-levelup.onrender.com/api`,
  
  withCredentials: true, // Ensures cookies are sent with every request
});

export default instance;
