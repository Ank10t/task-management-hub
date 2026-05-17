import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task, CreateTaskInput } from '../types';
import { taskApi } from '../services/api';


// Fetch all tasks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const tasks = await taskApi.getAllTasks();
    return tasks;
  }
);

// Add a new task
export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (task: CreateTaskInput) => {
    const newTask = await taskApi.createTask(task);
    return newTask;
  }
);

// Delete a task
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string) => {
    await taskApi.deleteTask(id);
    return id;
  }
);

// State Interface
interface TasksState {
  tasks: Task[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  searchQuery: '',
  isLoading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      
      // addTask
      .addCase(addTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to create task';
      })
      
      // delete task
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to delete task';
      });
  },
});

export const { setSearchQuery, clearError } = tasksSlice.actions;

export const selectAllTasks = (state: { tasks: TasksState }) => state.tasks.tasks;
export const selectSearchQuery = (state: { tasks: TasksState }) => state.tasks.searchQuery;
export const selectIsLoading = (state: { tasks: TasksState }) => state.tasks.isLoading;
export const selectError = (state: { tasks: TasksState }) => state.tasks.error;

// Selector to get filtered tasks based on search query
export const selectFilteredTasks = (state: { tasks: TasksState }) => {
  const { tasks, searchQuery } = state.tasks;
  if (!searchQuery.trim()) {
    return tasks;
  }
  return tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export default tasksSlice.reducer;