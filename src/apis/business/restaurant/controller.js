const Restaurant = require('../../../models/restaurant');

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
      return res.status(404).send();
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
      return res.status(404).send();
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
      return res.status(404).send();
    }

    res.status(200).send(restaurant);
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};
