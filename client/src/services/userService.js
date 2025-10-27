import { get, post, put, del } from '../utils/api';

// User-specific API calls
export const userService = {
  // Get all users
  getAllUsers: async () => {
    return await get('/users');
  },

  // Get user by ID
  getUserById: async (id) => {
    return await get(`/users/${id}`);
  },

  // Create new user
  createUser: async (userData) => {
    return await post('/users', userData);
  },

  // Update user
  updateUser: async (id, userData) => {
    return await put(`/users/${id}`, userData);
  },

  // Delete user
  deleteUser: async (id) => {
    return await del(`/users/${id}`);
  },
};

export default userService;

