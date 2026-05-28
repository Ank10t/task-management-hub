import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { addTask } from '../store/tasksSlice';
import { validateTask } from '../utils/validation';

const TaskForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.tasks.isLoading);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [status, setStatus] = useState<'Pending' | 'In Progress' | 'Completed'>('Pending');
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Manual validation
    const { isValid, errors } = validateTask({
      title,
      description,
      priority,
      status
    });
    
    if (!isValid) {
      setError(errors[0]); // Show first error
      return;
    }
    
    // Clear error and submit
    setError(null);
    await dispatch(addTask({ title, description, priority, status }));
    
    // Reset form
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setStatus('Pending');
  };
  
  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>Add New Task</h3>
      
      {error && <div className="error-message form-error">{error}</div>}
      
      <div className="form-group">
        <input
          type="text"
          placeholder="Task title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value as any)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as any)}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
      
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;