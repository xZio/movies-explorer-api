const router = require('express').Router();
const { requestLogger, errorLogger } = require('../middlewares/logger');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/not-found-error');
const { signupValidation, signinValidation } = require('../middlewares/validation');

router.use(requestLogger);
router.post('/signup', signupValidation, createUser);
router.post('/signin', signinValidation, login);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use(errorLogger);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});
module.exports = router;
