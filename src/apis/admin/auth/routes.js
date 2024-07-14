const router = require('express').Router();
const controller = require('./controller');
const {
  validateLogin,
  validateRegister,
} = require('../../common/validator/auth');
const authenticateAdmin = require('../../middleware/authenticateAdmin');

router.post('/login', validateLogin, controller.adminLogin);
router.post('/register', validateRegister, controller.adminRegister);
router.get('/user', authenticateAdmin, controller.getAdminUser);
router.post('/logout', controller.adminLogout);

module.exports = router;
