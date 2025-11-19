// Mock mode - No backend API calls, works offline for frontend design
const MOCK_MODE = true; // Set to false when backend is ready

/**
 * Auth Service
 * Mock mode: Simulates API calls without backend
 * Production mode: Makes actual API calls
 */

// Mock delay to simulate API call
const mockDelay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  /**
   * Register new user
   * @param {Object} data - Registration data (email, phone, referralCode)
   * @returns {Promise}
   */
  register: async (data) => {
    if (MOCK_MODE) {
      await mockDelay(800);
      // Store OTP in localStorage for mock verification
      const mockOTP = '123456'; // Fixed OTP for testing
      localStorage.setItem('mockOTP', mockOTP);
      localStorage.setItem('mockOTPEmail', data.email || '');
      localStorage.setItem('mockOTPPhone', data.phone || '');
      localStorage.setItem('mockOTPType', 'register');
      
      return {
        success: true,
        message: 'OTP sent successfully',
        otp: mockOTP, // Only in mock mode for testing
      };
    }
    
    // Production mode - actual API call
    const api = (await import('./api')).default;
    const { API_ENDPOINTS } = await import('../constants');
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, data);
    return response.data;
  },

  /**
   * Login user
   * @param {Object} credentials - Login credentials (email/phone, password)
   * @returns {Promise}
   */
  login: async (credentials) => {
    if (MOCK_MODE) {
      await mockDelay(800);
      return {
        token: 'mock_token_' + Date.now(),
        refreshToken: 'mock_refresh_token',
        user: { role: 'user' },
      };
    }
    
    const api = (await import('./api')).default;
    const { API_ENDPOINTS } = await import('../constants');
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },

  /**
   * Send OTP for login
   * @param {Object} data - Login data (emailOrPhone)
   * @returns {Promise}
   */
  sendLoginOTP: async (data) => {
    if (MOCK_MODE) {
      await mockDelay(800);
      // Store OTP in localStorage for mock verification
      const mockOTP = '123456'; // Fixed OTP for testing
      localStorage.setItem('mockOTP', mockOTP);
      localStorage.setItem('mockOTPEmailOrPhone', data.emailOrPhone);
      localStorage.setItem('mockOTPType', 'login');
      
      return {
        success: true,
        message: 'OTP sent successfully',
        otp: mockOTP, // Only in mock mode for testing
      };
    }
    
    // Production mode - actual API call
    try {
      const api = (await import('./api')).default;
      const { API_ENDPOINTS } = await import('../constants');
      const endpoint = API_ENDPOINTS.AUTH.SEND_LOGIN_OTP || API_ENDPOINTS.AUTH.LOGIN;
      
      const isEmail = data.emailOrPhone.includes('@');
      const requestData = isEmail 
        ? { email: data.emailOrPhone }
        : { phone: data.emailOrPhone.replace(/\D/g, '') };
      
      const response = await api.post(endpoint, {
        ...requestData,
        sendOTP: true,
      });
      return response.data;
    } catch (error) {
      console.error('sendLoginOTP error:', error);
      throw error;
    }
  },

  /**
   * Verify OTP
   * @param {Object} data - OTP data (email/phone, otp)
   * @returns {Promise}
   */
  verifyOTP: async (data) => {
    if (MOCK_MODE) {
      await mockDelay(1000);
      const storedOTP = localStorage.getItem('mockOTP');
      const enteredOTP = data.otp;
      
      // Accept any 6-digit OTP or the stored mock OTP
      if (enteredOTP === storedOTP || enteredOTP === '123456' || enteredOTP.length === 6) {
        const mockToken = 'mock_token_' + Date.now();
        const mockRefreshToken = 'mock_refresh_token_' + Date.now();
        
        // Store mock auth in localStorage
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('refreshToken', mockRefreshToken);
        
        // Clear mock OTP
        localStorage.removeItem('mockOTP');
        
        return {
          token: mockToken,
          refreshToken: mockRefreshToken,
          user: {
            id: 'mock_user_' + Date.now(),
            email: data.email || localStorage.getItem('mockOTPEmail') || '',
            phone: data.phone || localStorage.getItem('mockOTPPhone') || '',
            role: 'user',
          },
        };
      } else {
        throw new Error('Invalid OTP. Please try again.');
      }
    }
    
    // Production mode - actual API call
    const api = (await import('./api')).default;
    const { API_ENDPOINTS } = await import('../constants');
    const response = await api.post(API_ENDPOINTS.AUTH.VERIFY_OTP, data);
    return response.data;
  },

  /**
   * Refresh access token
   * @param {string} refreshToken - Refresh token
   * @returns {Promise}
   */
  refreshToken: async (refreshToken) => {
    if (MOCK_MODE) {
      await mockDelay(500);
      return {
        token: 'mock_token_' + Date.now(),
      };
    }
    
    const api = (await import('./api')).default;
    const { API_ENDPOINTS } = await import('../constants');
    const response = await api.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
      refreshToken,
    });
    return response.data;
  },

  /**
   * Logout user
   * @returns {Promise}
   */
  logout: async () => {
    if (MOCK_MODE) {
      await mockDelay(300);
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('mockOTP');
      return { success: true };
    }
    
    const api = (await import('./api')).default;
    const { API_ENDPOINTS } = await import('../constants');
    const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  },
};

export default authService;

