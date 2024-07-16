const router = require('express').Router();
const controller = require('./controller');
const authenticateAdmin = require('../../../middleware/authenticateAdmin');

router.get('/', authenticateAdmin, controller.getAllRestaurants);

module.exports = router;
