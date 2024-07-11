const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');
const { USER_ROLES, MIN_PASSWORD_LENGTH } = require('../../config');

const passwordRegex = new RegExp(
  `^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{${MIN_PASSWORD_LENGTH},}$`
);

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
      minlength: MIN_PASSWORD_LENGTH,
      validate: {
        validator: (value) => passwordRegex.test(value),
        message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long and contain at least one letter, one number, and one special character`,
      },
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

// Pre-save hook to hash the password before saving the user model
UserSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
