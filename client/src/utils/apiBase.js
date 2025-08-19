/**
 * API Base URL configuration
 * This utility provides the base URL for API calls based on the current environment
 */

// Determine environment and set the appropriate base URL
const isProduction = import.meta.env.MODE === 'production';
const backendURL = isProduction
  ? 'https://s74-dhayanithi-capstone-levelup.onrender.com' // production backend URL
  : 'http://localhost:5454'; // local backend URL

export default backendURL;