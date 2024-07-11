const router = require('express').Router();
const controller = require('./controller');
const { validateRegister } = require('./validator');

router.post('/login', controller.userLogin);
router.post('/register', validateRegister, controller.userRegister);

module.exports = router;
