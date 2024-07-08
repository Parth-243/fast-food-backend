const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: 'Invalid email address',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      validate: {
        validator: (value) => {
          // Password must contain at least one letter and one number
          return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
        },
        message:
          'Password must be at least 8 characters long and contain at least one letter and one number',
      },
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Add more roles as needed
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;
