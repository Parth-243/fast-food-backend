const router = require('express').Router();
const controller = require('./controller');
const authenticateBUser = require('../../../middleware/authenticateBUser');

// Apply the middleware to all routes
router.use(authenticateBUser);

// Get all food categories
router.get('/', controller.getAllFoodCategories);

// Get a single food category by ID
router.get('/:id', controller.getFoodCategoryById);

module.exports = router;
