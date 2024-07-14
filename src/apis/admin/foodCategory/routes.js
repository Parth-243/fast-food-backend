const router = require('express').Router();
const controller = require('./controller');
const {
  validateCreateFoodCategory,
  validateUpdateFoodCategory,
} = require('./validator');
const authenticateAdmin = require('../../middleware/authenticateAdmin');
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
router.use(authenticateAdmin);

// Create a new food category
router.post('/', validateCreateFoodCategory, controller.createFoodCategory);

// Get all food categories
router.get('/', controller.getAllFoodCategories);

// Get a single food category by ID
router.get('/:id', controller.getFoodCategoryById);

// Update a food category by ID
router.put(
  '/:id',
  validateUpdateFoodCategory,
  controller.updateFoodCategoryById
);

// Upload a picture for a food category
router.post(
  '/picture/:id',
  uploadConfig.single('file'),
  controller.uploadFoodCategoryPicture
);

// Delete a food category by ID
router.delete('/:id', controller.deleteFoodCategoryById);

module.exports = router;
