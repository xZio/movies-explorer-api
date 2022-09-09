const router = require('express').Router();
const { getUser, updateProfile } = require('../controllers/users');
const { updateProfileValidation } = require('../middlewares/validation');

router.get('/me', getUser);

router.patch('/me', updateProfileValidation, updateProfile);

module.exports = router;
