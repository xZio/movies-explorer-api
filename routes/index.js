const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/not-found-error');

router.use(requestLogger);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use(errorLogger);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});
module.exports = router;
