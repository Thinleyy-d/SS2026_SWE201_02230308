import axios from 'axios';
import { API_BASE_URL } from '../config';

// Import mock data as fallback
import { mockTaskApi, mockCategoryApi } from './mockData';

// Set this to true to use mock data, false to use real API
const USE_MOCK_DATA = true; // ← Change to false when you set up MockAPI

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Task API functions
export const taskApi = USE_MOCK_DATA ? mockTaskApi : {
  getTasks: async () => {
    try {
      const response = await api.get('/tasks');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch tasks');
    }
  },

  getTask: async (id) => {
    try {
      const response = await api.get(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch task details');
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await api.post('/tasks', {
        ...taskData,
        createdAt: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to create task');
    }
  },

  updateTask: async (id, taskData) => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update task');
    }
  },

  deleteTask: async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      return id;
    } catch (error) {
      throw new Error('Failed to delete task');
    }
  }
};

// Category API functions
export const categoryApi = USE_MOCK_DATA ? mockCategoryApi : {
  getCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch categories');
    }
  }
};