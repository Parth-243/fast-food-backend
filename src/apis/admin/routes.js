const router = require('express').Router();
const authRoutes = require('./auth/routes');
const foodCategoryRoutes = require('./foodCategory/routes');

router.use('/auth', authRoutes);
router.use('/food-categories', foodCategoryRoutes);

module.exports = router;
