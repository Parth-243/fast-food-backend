const { check, validationResult, body } = require('express-validator');
const { MIN_PASSWORD_LENGTH } = require('../../../../config');

exports.validateLogin = [
  body().custom((body) => {
    if (!body.email && !body.username) {
      throw new Error('Either email or username must be provided');
    }
    return true;
  }),
  check('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email'),
  check('username')
    .optional()
    .notEmpty()
    .withMessage('Username is required if email is not provided'),
  check('password')
    .isLength({ min: MIN_PASSWORD_LENGTH })
    .withMessage(
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`
    )
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/)
    .withMessage('Password must contain at least one digit')
    .matches(/[@$!%*?&]/)
    .withMessage(
      'Password must contain at least one special symbol (@, $, !, %, *, ?, &)'
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateRegister = [
  check('username').notEmpty().withMessage('Username is required'),
  check('email').isEmail().withMessage('Please provide a valid email'),
  check('password')
    .isLength({ min: MIN_PASSWORD_LENGTH })
    .withMessage(
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`
    )
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/)
    .withMessage('Password must contain at least one digit')
    .matches(/[@$!%*?&]/)
    .withMessage(
      'Password must contain at least one special symbol (@, $, !, %, *, ?, &)'
    ),
  check('confirmPassword')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
