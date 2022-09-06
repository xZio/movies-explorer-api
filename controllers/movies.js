const Movie = require('../models/movie');
const BadRequestError = require('../utils/bad-request-error');
const NotFoundError = require('../utils/not-found-error');
const ForbittenError = require('../utils/forbitten-error');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные для получения фильмов',
          ),
        );
        return;
      }
      next(err);
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;
  const ownerId = req.user._id;
  Movie.create({
    owner: ownerId,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные дынные для создания фильма',
          ),
        );
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const ownerId = req.user._id;
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным _id не найден');
      }
      if (ownerId !== movie.owner.toString()) {
        throw new ForbittenError('Нельзя удалить чужой фильм');
      }
      return Movie.findByIdAndRemove(req.params.movieId).then((deletedMovie) => {
        res.send(deletedMovie);
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные для удаления фильма',
          ),
        );
        return;
      }
      next(err);
    });
};
