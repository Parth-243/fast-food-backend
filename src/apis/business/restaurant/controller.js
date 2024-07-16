const Restaurant = require('../../../models/restaurant');
const { USER_ROLES, MINIO_RESTAURANT_BUCKET } = require('../../../../config');
const {
  uploadFiles,
  deleteFile,
} = require('../../../common/services/uploadService');

const ROLE = USER_ROLES.B_USER;

// Create a new restaurant
exports.createRestaurant = async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    restaurant.userId = req.user._id; // Assign the current user as the owner
    await restaurant.save();
    res.status(201).send(restaurant);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Get all restaurants for the logged-in user
exports.getAllRestaurants = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming res.user contains the logged-in user's information
    const restaurants = await Restaurant.find({ userId });
    res.status(200).send(restaurants);
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

// Get a single restaurant by ID
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!restaurant) {
      return res.status(404).send({ error: 'Restaurant not found!' });
    }
    res.status(200).send(restaurant);
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

// Update a restaurant by ID
exports.updateRestaurantById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'name',
    'mobile',
    'opensAt',
    'closesAt',
    'address',
    'city',
    'state',
    'postalCode',
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const restaurant = await Restaurant.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!restaurant) {
      return res.status(404).send({ error: 'Restaurant not found!' });
    }

    updates.forEach((update) => (restaurant[update] = req.body[update]));
    await restaurant.save();

    res.status(200).send(restaurant);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Delete a restaurant by ID
exports.deleteRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!restaurant) {
      return res.status(404).send({ error: 'Restaurant not found!' });
    }

    res.status(200).send(restaurant);
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

exports.uploadRestaurantPicture = async (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(400).send('No restaurant picture uploaded.');
  }

  try {
    const { _id: userId, role } = req.user;
    if (role !== ROLE) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const restaurant = await Restaurant.findOne({ userId });

    if (!restaurant) {
      return res.status(404).send({ error: 'Restaurant not found' });
    }

    if (restaurant.picture) {
      console.log('Previous picture: ' + restaurant.picture);
      try {
        await deleteFile(restaurant.picture);
        console.log('Previous file deleted successfully.');
      } catch (error) {
        console.error('Error deleting previous file:', error.message);
      }
    }

    const bucketName = MINIO_RESTAURANT_BUCKET;
    const [fileUrl] = await uploadFiles(bucketName, [file]);
    restaurant.picture = fileUrl;
    await restaurant.save();

    res.status(200).json({
      message: 'Restaurant picture uploaded successfully.',
      url: fileUrl,
    });
  } catch (error) {
    console.error('Error uploading restaurant picture:', error.message);
    res.status(422).send({ error: error.message });
  }
};
