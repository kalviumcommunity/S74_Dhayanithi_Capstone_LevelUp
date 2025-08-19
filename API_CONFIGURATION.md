# API Configuration Guide

## Overview

This document explains how the API configuration has been set up to work seamlessly in both local development and production environments.

## Environment Configuration

### Frontend (.env file)

The frontend uses Vite environment variables to determine which backend URL to use:

```
VITE_NODE_ENV=development
VITE_BACKEND_URL=https://s74-dhayanithi-capstone-levelup.onrender.com
VITE_LOCAL_BACKEND_URL=http://localhost:5454
```

- `VITE_NODE_ENV`: Set to either `development` or `production`
- `VITE_BACKEND_URL`: The production backend URL
- `VITE_LOCAL_BACKEND_URL`: The local backend URL

### Backend (.env file)

The backend uses environment variables to configure CORS and other settings:

```
PORT=5454
MONGO_URI=mongodb+srv://...
JWT_SECRET=...
NODE_ENV=development
CLIENT_URL=https://levelup-habits.netlify.app,http://localhost:5173
```

- `PORT`: The port the backend server runs on
- `NODE_ENV`: Set to either `development` or `production`
- `CLIENT_URL`: Comma-separated list of allowed frontend origins for CORS

## API URL Configuration

### Axios Service

The global Axios instance in `client/src/services/axios.js` automatically switches between local and production URLs based on the environment:

```javascript
import axios from 'axios';

const isProduction = import.meta.env.MODE === 'production';
const baseURL = isProduction
  ? 'https://s74-dhayanithi-capstone-levelup.onrender.com/api'
  : 'http://localhost:5454/api';

const instance = axios.create({
  baseURL,
  withCredentials: true
});

export default instance;
```

### API Base URL

The `client/src/utils/apiBase.js` file provides a consistent way to get the base URL:

```javascript
const isProduction = import.meta.env.MODE === 'production';
const backendURL = isProduction
  ? 'https://s74-dhayanithi-capstone-levelup.onrender.com'
  : 'http://localhost:5454';

export { backendURL };
```

## API Endpoints

All API endpoints have been updated to use the consistent format:

- Authentication: `/api/auth/...`
- Habits: `/api/habits/...`

## Testing API Connectivity

A utility script has been created at `client/src/utils/apiTest.js` to test API connectivity in both environments.

## Running the Project

### Local Development

1. Start the backend server:
   ```
   cd server
   npm install
   npm run dev
   ```

2. Start the frontend development server:
   ```
   cd client
   npm install
   npm run dev
   ```

3. The frontend will automatically connect to the local backend at `http://localhost:5454/api`.

### Production Deployment

1. Deploy the backend to your hosting provider (e.g., Render).
2. Deploy the frontend to your hosting provider (e.g., Netlify).
3. The frontend will automatically connect to the production backend URL.

## Troubleshooting

If you encounter API connectivity issues:

1. Check that the backend server is running.
2. Verify that the environment variables are set correctly.
3. Check the browser console for any CORS errors.
4. Ensure that the API endpoints match the expected format.