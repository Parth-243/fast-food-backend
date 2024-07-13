const router = require('express').Router();
const controller = require('./controller');
const {
  validateLogin,
  validateRegister,
} = require('../../common/validator/auth');

router.post('/login', validateLogin, controller.bUserLogin);
router.post('/register', validateRegister, controller.bUserRegister);
router.post('/logout', controller.bUserLogout);

module.exports = router;
