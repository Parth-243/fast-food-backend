const router = require('express').Router();
const controller = require('./controller');
const {
  validateLogin,
  validateRegister,
} = require('../../common/validator/auth');

router.post('/login', validateLogin, controller.adminLogin);
router.post('/register', validateRegister, controller.adminRegister);
router.post('/logout', controller.adminLogout);

module.exports = router;
