const router = require('express').Router();
const controller = require('./controller');
const { validateLogin, validateRegister } = require('./validator');

router.post('/login', validateLogin, controller.userLogin);
router.post('/register', validateRegister, controller.userRegister);

module.exports = router;
