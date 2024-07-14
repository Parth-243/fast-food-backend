const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      default: null,
      type: String,
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

// Removing the sensitive information from the food category json
FoodCategorySchema.methods.toJSON = function () {
  const foodCategoryObject = this.toObject();
  delete foodCategoryObject.__v;
  return foodCategoryObject;
};

const FoodCategory = mongoose.model('FoodCategory', FoodCategorySchema);
module.exports = FoodCategory;
