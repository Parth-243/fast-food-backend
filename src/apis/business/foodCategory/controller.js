const FoodCategory = require('../../../models/foodCategory');

// Get all food categories
exports.getAllFoodCategories = async (req, res) => {
  try {
    const foodCategories = await FoodCategory.find();
    res.status(200).send(foodCategories);
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

// Get a single food category by ID
exports.getFoodCategoryById = async (req, res) => {
  try {
    const foodCategory = await FoodCategory.findById(req.params.id);
    if (!foodCategory) {
      return res.status(404).send({ error: 'Food category not found' });
    }
    res.status(200).send(foodCategory);
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};
