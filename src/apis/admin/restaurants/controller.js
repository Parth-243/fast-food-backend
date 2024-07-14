const { USER_ROLES } = require('../../../../config');
const Restaurant = require('../../../models/restaurant');

async function getAllRestaurants(req, res) {
  try {
    const restaurant = await Restaurant.find();
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { getAllRestaurants };
