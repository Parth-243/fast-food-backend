const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema(
  {
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    foodCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'FoodCategory',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      default: 0.0,
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

// Removing the sensitive information from the food json
FoodSchema.methods.toJSON = function () {
  const foodObject = this.toObject();
  delete foodObject.__v;
  return foodObject;
};

const Food = mongoose.model('Food', FoodSchema);
module.exports = Food;
