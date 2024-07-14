const router = require('express').Router();
const authRoutes = require('./auth/routes');
const restaurantRoutes = require('./restaurant/routes');

router.use('/auth', authRoutes);
router.use('/restaurant', restaurantRoutes);

module.exports = router;
