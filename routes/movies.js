const router = require('express').Router();
const { deleteMovie, createMovie, getMovies } = require('../controllers/movies');
const { createMovieValidation, deleteMovieValidation } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', createMovieValidation, createMovie);
router.delete('/:movieId', deleteMovieValidation, deleteMovie);

module.exports = router;
