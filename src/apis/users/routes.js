const router = require('express').Router();
const authRoutes = require('./auth/routes');
const userProfileRoutes = require('./profile/routes');

router.use('/auth', authRoutes);
router.use('/profile', userProfileRoutes);

module.exports = router;
