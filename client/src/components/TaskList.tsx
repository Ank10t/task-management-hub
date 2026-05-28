import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { selectFilteredTasks } from '../store/tasksSlice';
import TaskCard from './TaskCard';

const TaskList: React.FC = () => {
  const filteredTasks = useSelector((state: RootState) => selectFilteredTasks(state));
  const isLoading = useSelector((state: RootState) => state.tasks.isLoading);
  const error = useSelector((state: RootState) => state.tasks.error);
  
  if (isLoading && filteredTasks.length === 0) {
    return <div className="loading">Loading...</div>;
  }
  
  if (error) {
    return <div className="error">{error}</div>;
  }
  
  if (filteredTasks.length === 0) {
    return <div className="empty-state">No results found.</div>;
  }
  
  return (
    <div className="task-list">
      <h3>Tasks ({filteredTasks.length})</h3>
      <div className="task-grid">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;