const router = require('express').Router();
const controller = require('./controller');

router.post('/login', controller.userLogin);
router.post('/register', controller.userRegister);

module.exports = router;
