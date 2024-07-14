const router = require('express').Router();
const authRoutes = require('./auth/routes');
const foodCategoryRoutes = require('./foodCategory/routes');
const usersRoutes = require('./users/routes');

router.use('/auth', authRoutes);
router.use('/food-categories', foodCategoryRoutes);
router.use('/users', usersRoutes);

module.exports = router;
