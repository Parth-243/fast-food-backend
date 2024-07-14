const { check, validationResult } = require('express-validator');
const { INDIAN_STATES_AND_CITIES } = require('../../../../config');

exports.validateCreateRestaurant = [
  check('name').notEmpty().withMessage('Name is required'),
  check('description')
    .optional()
    .notEmpty()
    .withMessage('Description cannot be empty'),
  check('mobile')
    .isMobilePhone(['en-IN'])
    .withMessage('Please enter a valid mobile number'),
  check('opensAt')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid opening time format, should be HH:MM'),
  check('closesAt')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid closing time format, should be HH:MM'),
  check('address').notEmpty().withMessage('Address is required'),
  check('state')
    .notEmpty()
    .withMessage('State is required')
    .custom((value) => {
      if (!Object.keys(INDIAN_STATES_AND_CITIES).includes(value)) {
        throw new Error('Invalid state');
      }
      return true;
    }),
  check('city')
    .notEmpty()
    .withMessage('City is required')
    .custom((value, { req }) => {
      const stateErrors = validationResult(req)
        .array()
        .filter((err) => err.path === 'state');
      if (stateErrors.length > 0) {
        throw new Error('Please select a valid state first');
      }
      if (
        req.body.state &&
        !INDIAN_STATES_AND_CITIES[req.body.state].includes(value)
      ) {
        throw new Error('Invalid city for the provided state');
      }
      return true;
    }),
  check('postalCode')
    .notEmpty()
    .withMessage('Postal code is required')
    .isPostalCode('IN') // Use 'IN' for Indian postal codes
    .withMessage('Please enter a valid postal code'),
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

exports.validateUpdateRestaurant = [
  check('name').optional().notEmpty().withMessage('Name cannot be empty'),
  check('description')
    .optional()
    .notEmpty()
    .withMessage('Description cannot be empty'),
  check('mobile')
    .optional()
    .isMobilePhone(['en-IN'])
    .withMessage('Please enter a valid mobile number'),
  check('opensAt')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid opening time format, should be HH:MM'),
  check('closesAt')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid closing time format, should be HH:MM'),
  check('address').optional().notEmpty().withMessage('Address cannot be empty'),
  check('state')
    .optional()
    .notEmpty()
    .withMessage('State is required')
    .custom((value) => {
      if (value && !Object.keys(INDIAN_STATES_AND_CITIES).includes(value)) {
        throw new Error('Invalid state');
      }
      return true;
    }),
  check('city')
    .optional()
    .notEmpty()
    .withMessage('City is required')
    .custom((value, { req }) => {
      const stateErrors = validationResult(req)
        .array()
        .filter((err) => err.path === 'state');
      if (stateErrors.length > 0) {
        throw new Error('Please select a valid state first');
      }
      if (
        req.body.state &&
        !INDIAN_STATES_AND_CITIES[req.body.state].includes(value)
      ) {
        throw new Error('Invalid city for the provided state');
      }
      return true;
    }),
  check('postalCode')
    .optional()
    .notEmpty()
    .withMessage('Postal code cannot be empty')
    .isPostalCode('IN') // Use 'IN' for Indian postal codes
    .withMessage('Please enter a valid postal code'),
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
