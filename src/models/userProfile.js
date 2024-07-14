const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { PHONE_NUMBER_LENGTH, GENDERS } = require('../../config');

const UserProfileSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true, trim: true, maxlength: 100 },
    lastName: { type: String, required: true, trim: true, maxlength: 100 },
    dob: { type: Date, required: true },
    gender: {
      type: String,
      enum: Object.values(GENDERS),
      required: true,
    },
    mobile: {
      type: String,
      minlength: PHONE_NUMBER_LENGTH,
    },
    address: { type: String, required: true, trim: true, maxlength: 200 },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: null,
      required: false,
      validate: {
        validator: function (v) {
          return /^(http|https):\/\/[^\s$.?#].[^\s]*$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
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
