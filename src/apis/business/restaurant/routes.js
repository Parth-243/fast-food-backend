const router = require('express').Router();
const controller = require('./controller');
const {
  validateCreateRestaurant,
  validateUpdateRestaurant,
} = require('./validator');
const authenticateUser = require('../../middleware/authenticateUser');

// Apply the middleware to all routes
router.use(authenticateUser);

// Create a new restaurant
router.post('/', validateCreateRestaurant, controller.createRestaurant);

// Get all restaurants
router.get('/', controller.getAllRestaurants);

// Get a single restaurant by ID
router.get('/:id', controller.getRestaurantById);

// Update a restaurant by ID
router.put('/:id', validateUpdateRestaurant, controller.updateRestaurantById);

// Delete a restaurant by ID
router.delete('/:id', controller.deleteRestaurantById);

module.exports = router;
