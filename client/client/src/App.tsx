import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './store/store';
import { fetchTasks } from './store/tasksSlice';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  
  return (
    <div className="App">
      <header className="app-header">
        <h1>Team Task Management Hub</h1>
      </header>
      
      <main className="app-main">
        <div className="container">
          <TaskForm />
          <SearchBar />
          <TaskList />
        </div>
      </main>
    </div>
  );
}

export default App;