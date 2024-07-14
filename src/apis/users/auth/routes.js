const router = require('express').Router();
const controller = require('./controller');
const {
  validateLogin,
  validateRegister,
} = require('../../common/validator/auth');
const authenticateUser = require('../../middleware/authenticateUser');

router.post('/login', validateLogin, controller.userLogin);
router.post('/register', validateRegister, controller.userRegister);
router.get('/user', authenticateUser, controller.getUser);
router.post('/logout', controller.userLogout);

module.exports = router;
