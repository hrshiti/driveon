import axios from 'axios';
import { store } from '../store/store';
import { logout, refreshTokenSuccess } from '../store/slices/authSlice';
import { API_BASE_URL } from '../config/api';

/**
 * Axios Instance Configuration
 * Base API configuration with interceptors
 */

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * Adds auth token to requests
 */
api.interceptors.request.use(
  (config) => {
    // Get token from Redux store or localStorage
    const token = store.getState().auth.token || localStorage.getItem('authToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Log warning if no token is available for protected routes
      console.warn('No authentication token found for request:', config.url);
    }

    // Don't set Content-Type for FormData - let browser set it with boundary
    // But ensure Authorization header is still set
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
      // Explicitly ensure Authorization header is set for FormData requests
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } else if (!config.headers['Content-Type']) {
      // Only set Content-Type if not FormData and not already set
      config.headers['Content-Type'] = 'application/json';
    }

    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles token refresh, errors, and logging
 */
api.interceptors.response.use(
  (response) => {
    // Calculate request duration
    if (response.config.metadata) {
      const duration = new Date() - response.config.metadata.startTime;
      console.log(`API Request: ${response.config.url} - ${duration}ms`);
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized (token expired or invalid)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Log token status for debugging
      const currentToken = store.getState().auth.token || localStorage.getItem('authToken');
      console.warn('401 Unauthorized - Token status:', {
        hasToken: !!currentToken,
        tokenLength: currentToken?.length || 0,
        errorMessage: error.response?.data?.message || 'Unknown error',
      });

      try {
        // Try to refresh token
        const refreshToken = store.getState().auth.refreshToken || 
                            localStorage.getItem('refreshToken');

        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
            refreshToken,
          });

          // Handle different response formats
          const token = response.data?.data?.token || response.data?.token;
          
          if (token) {
            // Update Redux store
            store.dispatch(refreshTokenSuccess({ token }));
            
            // Update authorization header
            originalRequest.headers.Authorization = `Bearer ${token}`;
            
            // Retry original request
            return api(originalRequest);
          } else {
            console.error('Token refresh failed: No token in response', response.data);
            throw new Error('Token refresh failed');
          }
        } else {
          // No refresh token, logout user
          console.warn('No refresh token available, logging out user');
          store.dispatch(logout());
          window.location.href = '/login';
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        console.error('Token refresh error:', refreshError);
        store.dispatch(logout());
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    if (error.response) {
      // Server responded with error
      const { status, data } = error.response;
      
      // Handle specific error codes
      switch (status) {
        case 403:
          console.error('Forbidden: You do not have permission to access this resource');
          break;
        case 404:
          console.error('Not Found: The requested resource was not found');
          break;
        case 500:
          console.error('Server Error: Something went wrong on the server');
          break;
        default:
          console.error(`API Error: ${status} - ${data?.message || 'Unknown error'}`);
      }
    } else if (error.request) {
      // Request was made but no response received
      const isNetworkError = error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED';
      
      if (isNetworkError) {
        // Provide helpful error message for network issues
        const errorMessage = error.code === 'ERR_CONNECTION_REFUSED'
          ? 'Cannot connect to server. Please check if the backend server is running.'
          : 'Network error. Please check your internet connection and try again.';
        
        // Create a more informative error object
        const networkError = new Error(errorMessage);
        networkError.code = error.code;
        networkError.isNetworkError = true;
        networkError.originalError = error;
        console.error('Network Error:', errorMessage);
        return Promise.reject(networkError);
      }
      
      console.error('Network Error: No response from server');
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;

