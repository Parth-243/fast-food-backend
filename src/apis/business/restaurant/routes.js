const router = require('express').Router();
const controller = require('./controller');
const {
  validateCreateRestaurant,
  validateUpdateRestaurant,
} = require('./validator');
const authenticateBUser = require('../../middleware/authenticateBUser');
const createMulterConfig = require('../../middleware/multerConfig');
const {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_FILE_SIZE_IN_MB,
} = require('../../../../config');

const uploadConfig = createMulterConfig(
  MAX_IMAGE_FILE_SIZE_IN_MB * 1024 * 1024,
  1,
  ALLOWED_IMAGE_TYPES
);

// Apply the middleware to all routes
router.use(authenticateBUser);

// Create a new restaurant
router.post('/', validateCreateRestaurant, controller.createRestaurant);

// Get all restaurants
router.get('/', controller.getAllRestaurants);

// Get a single restaurant by ID
router.get('/:id', controller.getRestaurantById);

// Update a restaurant by ID
router.put('/:id', validateUpdateRestaurant, controller.updateRestaurantById);

router.post(
  '/picture/:id',
  uploadConfig.single('file'),
  controller.uploadRestaurantPicture
);

// Delete a restaurant by ID
router.delete('/:id', controller.deleteRestaurantById);

module.exports = router;
