const router = require('express').Router();
const userRoutes = require('./src/apis/users/routes');
const businessRoutes = require('./src/apis/business/routes');
const adminRoutes = require('./src/apis/admin/routes');

/** GET / or GET /health-check - Check server health */
router.get(['/', '/health-check'], (request, response) => {
  response.send('OK');
});

// mount user routes at /users
router.use('/users', userRoutes);
router.use('/business', businessRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
