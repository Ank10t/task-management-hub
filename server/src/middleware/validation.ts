import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Title cannot exceed 100 characters'),
  description: z.string()
    .max(500, 'Description cannot exceed 500 characters')
    .optional(),
  priority: z.enum(['Low', 'Medium', 'High']),
  status: z.enum(['Pending', 'In Progress', 'Completed'])
});

export const validateCreateTask = (req: Request, res: Response, next: NextFunction) => {
  const result = createTaskSchema.safeParse(req.body);
  
  if (!result.success) {
    const errors = result.error.issues.map(issue => ({
      field: issue.path[0],
      message: issue.message
    }));
    
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors
    });
  }
  
  req.body = result.data;
  next();
};

export const validateDeleteHeader = (req: Request, res: Response, next: NextFunction) => {
  const deleteToken = req.headers['x-task-delete-token'];
  const validToken = process.env.DELETE_TOKEN || 'your-secret-token-123';
  
  if (!deleteToken) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: X-Task-Delete-Token header is required'
    });
  }
  
  if (deleteToken !== validToken) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Invalid delete token'
    });
  }
  
  next();
};