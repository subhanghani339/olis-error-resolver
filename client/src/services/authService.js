import { get, post } from '../utils/api';
import apiEndpoints from '../utils/api-endpoints';

export const authService = {
  // Register a new user
  register: async (userData) => {
    return await post(apiEndpoints.auth.register, userData);
  },

  // Login user
  login: async (credentials) => {
    return await post(apiEndpoints.auth.login, credentials);
  },

  // Logout user
  logout: async () => {
    return await post(apiEndpoints.auth.logout);
  },

  // Get current logged-in user profile
  getProfile: async () => {
    return await get(apiEndpoints.auth.profile);
  },
};

export default authService;