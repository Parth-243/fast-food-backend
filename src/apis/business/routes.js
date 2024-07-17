const router = require('express').Router();
const authRoutes = require('./auth/routes');
const restaurantRoutes = require('./restaurant/routes');
const foodCategoryRoutes = require('./foodCategory/routes');

router.use('/auth', authRoutes);
router.use('/restaurant', restaurantRoutes);
router.use('/food-categories', foodCategoryRoutes);

module.exports = router;
