import axios from 'axios';

// Get backend URL from environment with a local fallback for source runs.
const API_BASE = `${(process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001').replace(/\/$/, '')}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// Request interceptor for logging and auth
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[AegisX API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[AegisX API] Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[AegisX API] Response: ${response.status} ${response.statusText}`);
    return response;
  },
  (error) => {
    console.error('[AegisX API] Response error:', error.response?.data || error.message);
    
    // Handle specific error codes
    if (error.response?.status === 409) {
      throw new Error(error.response.data.detail || 'Duplicate entry detected');
    } else if (error.response?.status === 400) {
      throw new Error(error.response.data.detail || 'Invalid request data');
    } else if (error.response?.status === 500) {
      throw new Error('Internal system error. Security protocols activated.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please try again.');
    } else if (!error.response) {
      throw new Error('Network error. Check your connection.');
    }
    
    throw new Error(error.response?.data?.detail || 'An unexpected error occurred');
  }
);

// API service methods
export const api = {
  // Recruitment endpoints
  recruitment: {
    submit: async (applicationData) => {
      try {
        const response = await apiClient.post('/recruitment/submit', applicationData);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    
    getApplications: async () => {
      try {
        const response = await apiClient.get('/recruitment/applications');
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  },

  // Mission statistics endpoints
  mission: {
    getStats: async () => {
      try {
        const response = await apiClient.get('/mission/stats');
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    
    updateStats: async (statsData) => {
      try {
        const response = await apiClient.put('/mission/stats', statsData);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  },

  // Black files endpoints
  blackfiles: {
    getAll: async () => {
      try {
        const response = await apiClient.get('/blackfiles');
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    
    getByCodename: async (codename) => {
      try {
        const response = await apiClient.get(`/blackfiles/${codename}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  },

  // Founder information endpoints
  founder: {
    getInfo: async () => {
      try {
        const response = await apiClient.get('/founder/info');
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  },

  // Company information endpoints
  company: {
    getInfo: async () => {
      try {
        const response = await apiClient.get('/company/info');
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  },

  // Security endpoints (admin only)
  security: {
    getLogs: async (limit = 100) => {
      try {
        const response = await apiClient.get(`/security/logs?limit=${limit}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  },

  // System health check
  health: {
    check: async () => {
      try {
        const response = await apiClient.get('/health');
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  }
};

// Export axios instance for direct use if needed
export { apiClient };

// Default export
export default api;