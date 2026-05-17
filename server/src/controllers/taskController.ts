import { Request, Response } from 'express';
import { taskStore } from '../services/taskStore';
import { CreateTaskInput } from '../types';

export const taskController = {
    // GET /api/tasks
  getAllTasks: (req: Request, res: Response) => {
    try {
      const tasks = taskStore.getAll();
      
      res.json({
        success: true,
        data: tasks,
        count: tasks.length
      });
    } catch (error) {
      console.error('Error in getAllTasks:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  },

  // POST /api/tasks
  createTask: (req: Request, res: Response) => {
    try {
      const taskData: CreateTaskInput = req.body;
      const newTask = taskStore.create(taskData);
      
      res.status(201).json({
        success: true,
        data: newTask,
        message: 'Task created successfully'
      });
    } catch (error) {
      console.error('Error in createTask:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  },

  // DELETE /api/tasks/:id

  deleteTask: (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Task ID is required'
        });
      }
      
      const deleted = taskStore.delete(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: `Task with id ${id} not found`
        });
      }
      
      res.json({
        success: true,
        message: 'Task deleted successfully'
      });
    } catch (error) {
      console.error('Error in deleteTask:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
};