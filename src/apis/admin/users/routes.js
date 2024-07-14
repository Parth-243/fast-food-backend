const router = require('express').Router();
const controller = require('./controller');
const authenticateAdmin = require('../../middleware/authenticateAdmin');

router.get('/customers', authenticateAdmin, controller.getAllCustomers);

module.exports = router;
