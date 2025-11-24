/**
 * API Configuration
 * Centralized base URL configuration for backend API calls
 */

// Base URL for backend API
// Priority: 1. Environment variable, 2. Production URL, 3. Localhost (for development)
const getApiBaseUrl = () => {
  // Check if environment variable is set
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // Use production backend by default
  // For local development, set VITE_API_BASE_URL=http://localhost:5000/api in .env file
  return 'https://driveon-19hg.onrender.com/api';
};

export const API_BASE_URL = getApiBaseUrl();

export default API_BASE_URL;

