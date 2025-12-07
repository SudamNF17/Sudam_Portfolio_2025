import axios from 'axios';

// Get API URL from environment variable or use default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Log API URL in development to help with debugging
if (import.meta.env.DEV) {
  console.log('API URL:', API_URL);
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log('API Request:', config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle network errors
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      console.error('Network Error:', error);
      return Promise.reject({
        ...error,
        response: {
          data: {
            message: 'Unable to connect to server. Please check your internet connection and ensure the backend is running.',
          },
        },
      });
    }
    
    // Handle timeout errors
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        ...error,
        response: {
          data: {
            message: 'Request timeout. Please try again.',
          },
        },
      });
    }
    
    return Promise.reject(error);
  }
);

// Projects API
export const getProjects = () => api.get('/projects');
export const getProject = (id) => api.get(`/projects/${id}`);
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Messages API
export const createMessage = (data) => api.post('/messages', data);
export const getMessages = () => api.get('/messages');

// Skills API
export const getSkills = () => api.get('/skills');

// Experience API
export const getExperiences = () => api.get('/experience');

export default api;

