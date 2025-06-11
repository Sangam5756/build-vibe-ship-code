const { body } = require('express-validator');

exports.validateCreateTask = [
  body('title').notEmpty().withMessage('Title is required'),
  body('status').optional().isIn(['pending', 'completed']),
];

exports.validateUpdateTask = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('status').optional().isIn(['pending', 'completed']),
];
