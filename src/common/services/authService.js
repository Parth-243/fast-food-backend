const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  findUserByIdentifier,
  findUserByUsernameOrEmail,
} = require('./userService');
const { JWT_SECRET, JWT_EXPIRY_TIME } = require('../../../config');

exports.login = async ({ identifier, password, role }) => {
  const user = await findUserByIdentifier(identifier, role);

  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY_TIME,
  });

  return { user, token };
};

exports.register = async ({ username, email, password, role }) => {
  const existingUsers = await findUserByUsernameOrEmail(username, email, role);

  let errors = {};
  for (const user of existingUsers) {
    if (user.username === username.toLowerCase()) {
      errors.username = 'Username already exists';
    }
    if (user.email === email.toLowerCase()) {
      errors.email = 'Email already exists';
    }
  }

  if (Object.keys(errors).length > 0) {
    throw new Error(JSON.stringify(errors));
  }

  const user = new User({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password, // Pass the plain password, it will be hashed in the model
    role,
  });

  await user.save();

  const token = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY_TIME,
  });

  return { user, token };
};

exports.logout = async (res) => {
  res.cookie('x-access-token', '', {
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.clearCookie('x-access-token');
  return { message: 'Logout success' };
};
