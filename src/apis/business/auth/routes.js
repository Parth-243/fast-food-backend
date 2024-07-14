const router = require('express').Router();
const controller = require('./controller');
const {
  validateLogin,
  validateRegister,
} = require('../../common/validator/auth');
const authenticateUser = require('../../middleware/authenticateUser');

router.post('/login', validateLogin, controller.bUserLogin);
router.post('/register', validateRegister, controller.bUserRegister);
router.get('/user', authenticateUser, controller.getBUser);
router.post('/logout', controller.bUserLogout);

module.exports = router;
