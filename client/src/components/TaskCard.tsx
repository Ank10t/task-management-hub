import React from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { deleteTask } from '../store/tasksSlice';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const handleDelete = () => {
    if (window.confirm(`Delete task "${task.title}"?`)) {
      dispatch(deleteTask(task.id));
    }
  };
  return (
    <div className="task-card">
      <div className="task-header">
        <h4>{task.title}</h4>
        <button onClick={handleDelete} className="delete-btn" title="Delete task">
          Delete
        </button>
      </div>
      
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
    </div>
  );
};

export default TaskCard;