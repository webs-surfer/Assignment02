import { body, param } from 'express-validator';
export const createTaskValidation = [
    body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 100 }).withMessage('Title must be at most 100 characters long'),
    body('description').optional().isString().withMessage('Description must be string').isLength({ max: 500 }).withMessage('Description must be at most 500 characters long'),
    body('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Status must be one of: pending, in-progress, completed'),
    body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Priority must be one of: low, medium, high'),
    body('category').optional().trim().isLength({ max: 50 }).withMessage('Category must be at most 50 characters long'),
    body('progress').optional().isInt({ min: 0, max: 100 }).withMessage('Progress must be between 0 and 100').toInt(),
    body('dueDate').optional().isISO8601().toDate().withMessage('Due date must be a valid date'),
];
export const idValidation = [
    param('id').isMongoId().withMessage('Invalid task ID'),
];
    
