const { check, validationResult } = require('express-validator');

exports.validateCreateFood = [
  check('restaurantId')
    .notEmpty()
    .withMessage('Restaurant ID is required')
    .isMongoId()
    .withMessage('Restaurant ID must be a valid Mongo ID'),
  check('foodCategoryId')
    .notEmpty()
    .withMessage('Food Category ID is required')
    .isMongoId()
    .withMessage('Food Category ID must be a valid Mongo ID'),
  check('name').notEmpty().withMessage('Name is required'),
  check('description')
    .optional()
    .notEmpty()
    .withMessage('Description cannot be empty'),
  check('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
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

exports.validateUpdateFood = [
  check('restaurantId')
    .optional()
    .isMongoId()
    .withMessage('Restaurant ID must be a valid Mongo ID'),
  check('foodCategoryId')
    .optional()
    .isMongoId()
    .withMessage('Food Category ID must be a valid Mongo ID'),
  check('name').optional().notEmpty().withMessage('Name cannot be empty'),
  check('description')
    .optional()
    .notEmpty()
    .withMessage('Description cannot be empty'),
  check('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
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
