const FoodCategory = require('../../../models/foodCategory');
const {
  uploadFiles,
  deleteFile,
} = require('../../../common/services/uploadService');
const { MINIO_RESTAURANT_BUCKET } = require('../../../../config');

// Create a new food category
exports.createFoodCategory = async (req, res) => {
  try {
    const foodCategory = new FoodCategory(req.body);
    await foodCategory.save();
    res.status(201).send(foodCategory);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

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

// Update a food category by ID
exports.updateFoodCategoryById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'description'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const foodCategory = await FoodCategory.findById(req.params.id);

    if (!foodCategory) {
      return res.status(404).send({ error: 'Food category not found' });
    }

    updates.forEach((update) => (foodCategory[update] = req.body[update]));
    await foodCategory.save();

    res.status(200).send(foodCategory);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Delete a food category by ID
exports.deleteFoodCategoryById = async (req, res) => {
  try {
    const foodCategory = await FoodCategory.findByIdAndDelete(req.params.id);

    if (!foodCategory) {
      return res.status(404).send({ error: 'Food category not found' });
    }

    res.status(200).send(foodCategory);
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

// Upload a picture for a food category
exports.uploadFoodCategoryPicture = async (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(400).send('No food category picture uploaded.');
  }

  try {
    const { _id: userId } = req.user;

    const foodCategory = await FoodCategory.findById(req.params.id);

    if (!foodCategory) {
      return res.status(404).send({ error: 'Food category not found' });
    }

    if (foodCategory.picture) {
      try {
        await deleteFile(foodCategory.picture);
      } catch (error) {
        console.error('Error deleting previous file:', error.message);
      }
    }

    const bucketName = MINIO_RESTAURANT_BUCKET;
    const [fileUrl] = await uploadFiles(bucketName, [file]);
    foodCategory.picture = fileUrl;
    await foodCategory.save();

    res.status(200).json(foodCategory);
  } catch (error) {
    console.error('Error uploading food category picture:', error.message);
    res.status(422).send({ error: error.message });
  }
};
