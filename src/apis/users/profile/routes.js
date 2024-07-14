const router = require('express').Router();
const controller = require('./controller');
const {
  validateCreateUserProfile,
  validateUpdateUserProfile,
} = require('./validator');
const authenticateUser = require('../../middleware/authenticateUser');

router.use(authenticateUser);

router.post('/', validateCreateUserProfile, controller.createUserProfile);
router.get('/', controller.getUserProfile);
router.put('/:id', validateUpdateUserProfile, controller.updateUserProfile);

module.exports = router;
