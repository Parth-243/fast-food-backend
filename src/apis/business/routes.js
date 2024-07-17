const router = require('express').Router();
const authRoutes = require('./auth/routes');
const restaurantRoutes = require('./restaurant/routes');
const foodCategoryRoutes = require('./foodCategory/routes');
const foodRoutes = require('./food/routes');

router.use('/auth', authRoutes);
router.use('/restaurant', restaurantRoutes);
router.use('/food-categories', foodCategoryRoutes);
router.use('/food', foodRoutes);

module.exports = router;
