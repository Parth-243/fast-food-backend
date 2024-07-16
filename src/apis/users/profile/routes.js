const router = require('express').Router();
const controller = require('./controller');
const {
  validateCreateUserProfile,
  validateUpdateUserProfile,
} = require('./validator');
const authenticateUser = require('../../../middleware/authenticateUser');
const createMulterConfig = require('../../../middleware/multerConfig');
const {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_FILE_SIZE_IN_MB,
} = require('../../../../config');

const uploadConfig = createMulterConfig(
  MAX_IMAGE_FILE_SIZE_IN_MB * 1024 * 1024,
  1,
  ALLOWED_IMAGE_TYPES
);

router.use(authenticateUser);

router.post('/', validateCreateUserProfile, controller.createUserProfile);
router.get('/', controller.getUserProfile);
router.put('/', validateUpdateUserProfile, controller.updateUserProfile);
router.post('/picture', uploadConfig.single('file'), controller.uploadPicture);

module.exports = router;
