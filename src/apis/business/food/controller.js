const Food = require('../../../models/food');
const Restaurant = require('../../../models/restaurant');
const FoodCategory = require('../../../models/foodCategory');
const {
  uploadFiles,
  deleteFile,
} = require('../../../common/services/uploadService');
const { MINIO_RESTAURANT_BUCKET } = require('../../../../config');

// Create a new food
exports.createFood = async (req, res) => {
  try {
    const food = new Food(req.body);
    await food.save();
    res.status(201).send(food);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getFoodsByCategories = async (req, res) => {
  const { restaurantId, foodCategoryId } = req.query;

  try {
    // Validate and find restaurant
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).send({ error: 'Restaurant not found' });
    }

    // Validate and find food category if provided
    if (foodCategoryId) {
      const foodCategory = await FoodCategory.findById(foodCategoryId);
      if (!foodCategory) {
        return res.status(404).send({ error: 'Food Category not found' });
      }
    }

    // Build query based on the provided filters
    const query = { restaurantId };
    if (foodCategoryId) {
      query.foodCategoryId = foodCategoryId;
    }

    const foods = await Food.find(query).populate(
      'restaurantId foodCategoryId'
    );

    // Transform the data into the desired format
    const result = foods.reduce((acc, food) => {
      const {
        _id: categoryId,
        name: categoryName,
        description,
        picture,
      } = food.foodCategoryId;
      const foodData = {
        name: food.name,
        description: food.description,
        price: food.price,
        picture: food.picture,
      };

      // Check if the category already exists in the accumulator
      const categoryIndex = acc.findIndex(
        (item) => item.categoryId.toString() === categoryId.toString()
      );
      if (categoryIndex > -1) {
        // If category exists, add the food to the existing category
        acc[categoryIndex].foods.push(foodData);
      } else {
        // If category does not exist, create a new entry for the category
        acc.push({
          categoryId,
          categoryName,
          description,
          picture,
          restaurantId: food.restaurantId._id,
          foods: [foodData],
        });
      }

      return acc;
    }, []);

    res.status(200).send(result);
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

// Get a single food by ID
exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).send({ error: 'Food not found' });
    }
    res.status(200).send(food);
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

// Update a food by ID
exports.updateFoodById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['foodCategoryId', 'name', 'description', 'price'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).send({ error: 'Food not found' });
    }

    updates.forEach((update) => (food[update] = req.body[update]));
    await food.save();

    res.status(200).send(food);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Delete a food by ID
exports.deleteFoodById = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).send({ error: 'Food not found' });
    }

    res.status(200).send(food);
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

// Upload a picture for a food
exports.uploadFoodPicture = async (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(400).send('No food picture uploaded.');
  }

  try {
    const { _id: userId } = req.user;

    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).send({ error: 'Food not found' });
    }

    if (food.picture) {
      try {
        await deleteFile(food.picture);
      } catch (error) {
        console.error('Error deleting previous file:', error.message);
      }
    }

    const bucketName = MINIO_RESTAURANT_BUCKET;
    const [fileUrl] = await uploadFiles(bucketName, [file]);
    food.picture = fileUrl;
    await food.save();

    res.status(200).json(food);
  } catch (error) {
    console.error('Error uploading food picture:', error.message);
    res.status(422).send({ error: error.message });
  }
};
