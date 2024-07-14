const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { PHONE_NUMBER_LENGTH } = require('../../config');

const RestaurantSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: {
      type: String,
      required: true,
    },
    description: {
      default: null,
      type: String,
    },
    mobile: {
      type: String,
      minlength: PHONE_NUMBER_LENGTH,
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
    picture: {
      type: String,
      default: null,
      validate: {
        validator: function (v) {
          return v === null || /^(http|https):\/\/[^\s$.?#].[^\s]*$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

// Removing the sensitive information from the restaurant json
RestaurantSchema.methods.toJSON = function () {
  const restaurantObject = this.toObject();
  delete restaurantObject.__v;
  return restaurantObject;
};

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = Restaurant;
