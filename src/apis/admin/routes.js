const router = require('express').Router();
const authRoutes = require('./auth/routes');
const foodCategoryRoutes = require('./foodCategory/routes');
const usersRoutes = require('./users/routes');
const restaurantRoutes = require('./restaurants/routes');

router.use('/auth', authRoutes);
router.use('/food-categories', foodCategoryRoutes);
router.use('/users', usersRoutes);
router.use('/restaurants', restaurantRoutes);

module.exports = router;
