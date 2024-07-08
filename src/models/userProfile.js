const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserProfileSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String },
    lastName: { type: String },
    dob: { type: Date },
    address: { type: String },
    gender: { type: String },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

const UserProfile = mongoose.model('UserProfile', UserProfileSchema);
module.exports = UserProfile;
