const router = require('express').Router();
const controller = require('./controller');
const {
  validateLogin,
  validateRegister,
} = require('../../../common/validator/authValidator');
const authenticateBUser = require('../../../middleware/authenticateBUser');

router.post('/login', validateLogin, controller.bUserLogin);
router.post('/register', validateRegister, controller.bUserRegister);
router.get('/user', authenticateBUser, controller.getBUser);
router.post('/logout', controller.bUserLogout);

module.exports = router;
