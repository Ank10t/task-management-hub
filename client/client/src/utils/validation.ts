export interface TaskFormData {
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In Progress' | 'Completed';
}

export const validateTask = (data: TaskFormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!data.title || data.title.trim() === '') {
    errors.push('Title is required');
  }
  
  const validPriorities = ['Low', 'Medium', 'High'];
  if (!validPriorities.includes(data.priority)) {
    errors.push('Priority must be Low, Medium, or High');
  }
  
  const validStatuses = ['Pending', 'In Progress', 'Completed'];
  if (!validStatuses.includes(data.status)) {
    errors.push('Status must be Pending, In Progress, or Completed');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};