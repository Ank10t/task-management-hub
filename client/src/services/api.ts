import axios from 'axios';
import { Task, CreateTaskInput, ApiResponse } from '../types';

const API_BASE_URL = '/api';

// axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// INTERCEPTOR: Automatically adds security header to all DELETE requests
apiClient.interceptors.request.use((config) => {
  if (config.method === 'delete') {
    config.headers['X-Task-Delete-Token'] = 'your-secret-token-123';
  }
  return config;
});

export const taskApi = {
  // GET /api/tasks - fetch all task
  getAllTasks: async (): Promise<Task[]> => {
    const response = await apiClient.get<ApiResponse<Task[]>>('/tasks');
    return response.data.data || [];
  },

  // POST /api/tasks - create
  createTask: async (task: CreateTaskInput): Promise<Task> => {
    const response = await apiClient.post<ApiResponse<Task>>('/tasks', task);
    if (!response.data.data) {
      throw new Error('Failed to create task');
    }
    return response.data.data;
  },
  
  // DELETE /api/tasks/:id - delete
  deleteTask: async (id: string): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`);
  },
};