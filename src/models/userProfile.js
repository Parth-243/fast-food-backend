const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { PHONE_NUMBER_LENGTH } = require('../../config');

const phoneRegex = new RegExp(`^\d{${PHONE_NUMBER_LENGTH}}$`);

const UserProfileSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true, trim: true, maxlength: 100 },
    lastName: { type: String, required: true, trim: true, maxlength: 100 },
    dob: { type: Date, required: true },
    address: { type: String, required: true, trim: true, maxlength: 200 },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (value) => phoneRegex.test(value),
        message: '{VALUE} is not a valid 10-digit mobile number!',
      },
    },
    profilePicture: {
      type: String,
      required: false,
      validate: {
        validator: function (v) {
          return /^(http|https):\/\/[^ "]+$/.test(v);
        },
        message: '{VALUE} is not a valid URL!',
      },
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

UserProfileSchema.methods.toJSON = function () {
  const userProfileObject = this.toObject();
  delete userProfileObject.__v;
  return userProfileObject;
};

const UserProfile = mongoose.model('UserProfile', UserProfileSchema);
module.exports = UserProfile;
