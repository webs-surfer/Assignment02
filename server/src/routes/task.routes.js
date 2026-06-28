import { Router } from 'express';
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from '../controllers/task.controller.js';
import { validateTask } from '../middleware/validation.middleware.js';
import { createTaskValidation, idValidation } from '../validations/task.validation.js';
const router = Router();

router.post('/',createTaskValidation,validateTask, createTask);
router.get('/', getAllTasks);
router.get('/:id',idValidation, validateTask, getTaskById);
router.put('/:id',idValidation, createTaskValidation, validateTask, updateTask );
router.delete('/:id',idValidation,validateTask, deleteTask);

export default router;
