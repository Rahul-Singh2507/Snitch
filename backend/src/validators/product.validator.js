import { body } from 'express-validator';

function validateRequest(req, res, next) {
  const errors = validationResult(req);
    
    if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() });
    }
    next();
}   


export const createProductValidator = [
  body('title')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage('Description must be between 10 and 200 characters'),
  body('price.amount')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('price.currency')
    .isIn(['USD', 'EUR', 'GBP', 'JPY', 'INR'])
    .withMessage('Invalid currency'),
  body('images')
    .isArray()
    .withMessage('Images must be an array'),
    validateRequest
];