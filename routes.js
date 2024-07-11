const router = require('express').Router();
const userRoutes = require('./src/apis/users/routes');

/** GET / or GET /health-check - Check server health */
router.get(['/', '/health-check'], (request, response) => {
  response.send('OK');
});

// mount user routes at /users
router.use('/users', userRoutes);

module.exports = router;
