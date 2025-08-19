/**
 * API Test Utility
 * 
 * This utility helps test API connectivity in both local and production environments.
 * Run this file with Node.js to test the API endpoints.
 */

import axios from 'axios';

// Test environments
const environments = [
  {
    name: 'Local Development',
    baseURL: 'http://localhost:5454/'
  },
  {
    name: 'Production',
    baseURL: 'https://s74-dhayanithi-capstone-levelup.onrender.com/'
  }
];

// Test endpoints
const endpoints = [
  { method: 'GET', path: '/auth/me', auth: true, name: 'Get Current User' },
  { method: 'GET', path: '/habits/all-habits', auth: true, name: 'Get All Habits' },
  { method: 'GET', path: '/habits/total-streak', auth: true, name: 'Get Total Streak' },
  // Add a non-auth endpoint for testing
  { method: 'GET', path: '/', auth: false, name: 'API Root' },
];

// Run tests
async function runTests() {
  console.log('🧪 API Connectivity Test');
  console.log('========================');
  
  for (const env of environments) {
    console.log(`\n🌐 Testing ${env.name} environment: ${env.baseURL}`);
    
    const instance = axios.create({
      baseURL: env.baseURL,
      withCredentials: true,
      timeout: 5000
    });
    
    for (const endpoint of endpoints) {
      try {
        console.log(`\n📡 Testing: ${endpoint.name} (${endpoint.method} ${endpoint.path})`);
        
        // Skip auth-required endpoints in automated tests
        if (endpoint.auth) {
          console.log('  ⚠️ Requires authentication - skipping automated test');
          continue;
        }
        
        const response = await instance({
          method: endpoint.method.toLowerCase(),
          url: endpoint.path,
        });
        
        console.log(`  ✅ Status: ${response.status}`);
        console.log(`  📦 Response: ${JSON.stringify(response.data).substring(0, 100)}...`);
      } catch (error) {
        console.log(`  ❌ Error: ${error.message}`);
        if (error.response) {
          console.log(`  📦 Response: ${JSON.stringify(error.response.data)}`);
        }
      }
    }
  }
}

runTests().catch(console.error);