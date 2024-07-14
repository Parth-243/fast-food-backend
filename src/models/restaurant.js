const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { MIN_PHONE_LENGTH } = require('../../config');

const RestaurantSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      minlength: MIN_PHONE_LENGTH,
    },
    opensAt: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, // Matches HH:MM format
    },
    closesAt: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, // Matches HH:MM format
    },
    address: {
      type: String,
      required: true,
    },
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
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

// Removing the sensitive information from the user json
RestaurantSchema.methods.toJSON = function () {
  const restaurantObject = this.toObject();
  delete restaurantObject.__v;
  return restaurantObject;
};

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = Restaurant;
