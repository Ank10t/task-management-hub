import { Router } from 'express';
import { taskController } from '../controllers/taskController';
import { validateCreateTask, validateDeleteHeader } from '../middleware/validation';

const router = Router();

// GET /api/tasks
router.get('/', taskController.getAllTasks);

// POST /api/tasks
router.post('/', validateCreateTask, taskController.createTask);

// DELETE /api/tasks/:id
router.delete('/:id', validateDeleteHeader, taskController.deleteTask);

export default router;