import { get, post, put, del } from '../utils/api';
import apiEndpoints from '../utils/api-endpoints';

// User-specific API calls
export const userService = {
  // Get all users
  getAllUsers: async () => {
    return await get(apiEndpoints.users.getAll);
  },

  // Get user by ID
  getUserById: async (id) => {
    return await get(apiEndpoints.users.getById.replace(':id', id));
  },

  // Create new user
  createUser: async (userData) => {
    return await post(apiEndpoints.users.create, userData);
  },

  // Update user
  updateUser: async (id, userData) => {
    return await put(apiEndpoints.users.update.replace(':id', id), userData);
  },

  // Delete user
  deleteUser: async (id) => {
    return await del(apiEndpoints.users.delete.replace(':id', id));
  },
};

export default userService;

