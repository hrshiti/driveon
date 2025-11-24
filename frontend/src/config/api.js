/**
 * API Configuration
 * Centralized base URL configuration for backend API calls
 */

// Base URL for backend API
// Can be overridden by environment variable VITE_API_BASE_URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default API_BASE_URL;

