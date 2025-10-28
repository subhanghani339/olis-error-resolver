import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (optional - for adding auth tokens, etc.)
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (optional - for handling errors globally)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally here
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// GET method
export const get = async (url, config = {}) => {
  const response = await api.get(url, config);
  return response.data;
};

// POST method
export const post = async (url, data = {}, config = {}) => {
  const response = await api.post(url, data, config);
  return response.data;
};

// PUT method
export const put = async (url, data = {}, config = {}) => {
  const response = await api.put(url, data, config);
  return response.data;
};

// DELETE method
export const del = async (url, config = {}) => {
  const response = await api.delete(url, config);
  return response.data;
};

// Export the axios instance for custom use cases
export default api;

