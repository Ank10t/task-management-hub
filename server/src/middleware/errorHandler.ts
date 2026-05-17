import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[ERROR] ${req.method} ${req.url}:`, err.message);
  
  // Zod validation errors
  if (err.name === 'ZodError') {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: err.errors
    });
  }
  
  // specific error types
  if (err.type === 'validation') {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }
  
  // Default
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.url}`,
    message: 'Route not found'
  });
};