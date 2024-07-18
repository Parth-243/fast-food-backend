const Food = require('../../../models/food');
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

// Get all foods
exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).send(foods);
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
