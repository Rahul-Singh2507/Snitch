import {body,validationResult} from 'express-validator';


function validateRequest(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}

export const validateRegisterUser = [
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  body("contact")
    .trim()
    .notEmpty().withMessage("Contact is required")
    .isLength({ min: 10, max: 10 }).withMessage("Contact must be 10 digits")
    .isNumeric().withMessage("Contact must contain only numbers"),

  body("password")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

  body("fullname")
    .notEmpty().withMessage("Full name is required")
    .isLength({ min: 3 }).withMessage("Full name must be at least 3 characters long"),

  body("isSeller")
    .optional()
    .isBoolean().withMessage("isSeller must be boolean")
    .toBoolean(),

    validateRequest
];


export const validateLoginUser = [
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  validateRequest
];