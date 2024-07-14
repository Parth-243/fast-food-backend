const { check, validationResult } = require('express-validator');

exports.validateCreateFoodCategory = [
  check('name').notEmpty().withMessage('Name is required'),
  check('description')
    .optional()
    .notEmpty()
    .withMessage('Description cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const extractedErrors = {};
      errors.array().forEach((err) => {
        extractedErrors[err.path] = err.msg;
      });
      return res.status(400).json(extractedErrors);
    }
    next();
  },
];

exports.validateUpdateFoodCategory = [
  check('name').optional().notEmpty().withMessage('Name cannot be empty'),
  check('description')
    .optional()
    .notEmpty()
    .withMessage('Description cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const extractedErrors = {};
      errors.array().forEach((err) => {
        extractedErrors[err.path] = err.msg;
      });
      return res.status(400).json(extractedErrors);
    }
    next();
  },
];
