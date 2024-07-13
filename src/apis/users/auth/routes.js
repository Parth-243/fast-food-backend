const router = require('express').Router();
const controller = require('./controller');
const {
  validateLogin,
  validateRegister,
} = require('../../common/validator/auth');

router.post('/login', validateLogin, controller.userLogin);
router.post('/register', validateRegister, controller.userRegister);
router.post('/logout', controller.userLogout);

module.exports = router;
