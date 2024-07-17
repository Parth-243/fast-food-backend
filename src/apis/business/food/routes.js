const router = require('express').Router();
const controller = require('./controller');
const { validateCreateFood, validateUpdateFood } = require('./validator');
const authenticateBUser = require('../../../middleware/authenticateBUser');
const createMulterConfig = require('../../../middleware/multerConfig');
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

// Create a new food
router.post('/', validateCreateFood, controller.createFood);

// Get all food categories
router.get('/', controller.getAllFoods);

// Get a single food by ID
router.get('/:id', controller.getFoodById);

// Update a food by ID
router.put('/:id', validateUpdateFood, controller.updateFoodById);

// Upload a picture for a food
router.post(
  '/picture/:id',
  uploadConfig.single('file'),
  controller.uploadFoodPicture
);

// Delete a food by ID
router.delete('/:id', controller.deleteFoodById);

module.exports = router;
