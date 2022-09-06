const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, updateProfile } = require('../controllers/users');

router.get('/me', getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().min(2).max(30),
    _id: Joi.string().required().length(24),
  }),
}), updateProfile);

module.exports = router;
