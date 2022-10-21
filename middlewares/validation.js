const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const isValidUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message('Невалидный Email');
};

const signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.object().required(),
    trailerLink: Joi.string().required().custom(isValidUrl),
    thumbnail: Joi.string().required().custom(isValidUrl),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().min(2).max(30).required()
      .custom(isValidUrl),
  }),
});

module.exports = {
  signinValidation,
  signupValidation,
  createMovieValidation,
  deleteMovieValidation,
  updateProfileValidation,
};
