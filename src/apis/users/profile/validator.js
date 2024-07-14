const { check, validationResult } = require('express-validator');
const { INDIAN_STATES_AND_CITIES } = require('../../../../config');
const { GENDERS } = require('../../../../config');

exports.validateCreateRestaurant = [
  check('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .trim()
    .isLength({ max: 100 })
    .withMessage('First name must be less than 100 characters'),
  check('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .trim()
    .isLength({ max: 100 })
    .withMessage('Last name must be less than 100 characters'),
  check('dob')
    .notEmpty()
    .withMessage('Date of birth is required')
    .isISO8601()
    .withMessage('Date of birth must be in ISO 8601 format (YYYY-MM-DD)'),
  check('gender')
    .notEmpty()
    .withMessage('Gender is required')
    .isIn(Object.values(GENDERS))
    .withMessage('Invalid gender'),
  check('mobile')
    .notEmpty()
    .withMessage('Mobile number is required')
    .isMobilePhone(['en-IN'])
    .withMessage('Please enter a valid mobile number'),
  check('address')
    .notEmpty()
    .withMessage('Address is required')
    .trim()
    .isLength({ max: 200 })
    .withMessage('Address must be less than 200 characters'),
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

exports.validateUpdateUserProfile = [
  check('firstName')
    .optional()
    .notEmpty()
    .withMessage('First name cannot be empty')
    .trim()
    .isLength({ max: 100 })
    .withMessage('First name must be less than 100 characters'),
  check('lastName')
    .optional()
    .notEmpty()
    .withMessage('Last name cannot be empty')
    .trim()
    .isLength({ max: 100 })
    .withMessage('Last name must be less than 100 characters'),
  check('dob')
    .optional()
    .notEmpty()
    .withMessage('Date of birth cannot be empty')
    .isISO8601()
    .withMessage('Date of birth must be in ISO 8601 format (YYYY-MM-DD)'),
  check('gender')
    .optional()
    .notEmpty()
    .withMessage('Gender cannot be empty')
    .isIn(Object.values(GENDERS))
    .withMessage('Invalid gender'),
  check('mobile')
    .optional()
    .notEmpty()
    .withMessage('Mobile number cannot be empty')
    .isMobilePhone(['en-IN'])
    .withMessage('Please enter a valid mobile number'),
  check('address')
    .optional()
    .notEmpty()
    .withMessage('Address cannot be empty')
    .trim()
    .isLength({ max: 200 })
    .withMessage('Address must be less than 200 characters'),
  check('state')
    .optional()
    .notEmpty()
    .withMessage('State cannot be empty')
    .custom((value) => {
      if (!Object.keys(INDIAN_STATES_AND_CITIES).includes(value)) {
        throw new Error('Invalid state');
      }
      return true;
    }),
  check('city')
    .optional()
    .notEmpty()
    .withMessage('City cannot be empty')
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
