import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

