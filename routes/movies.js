const router = require('express').Router();
const { deleteMovie, createMovie, getMovies } = require('../controllers/movies');
const { createMovieValidatin, deleteMovieValidation } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', createMovieValidatin, createMovie);
router.delete('/:movieId', deleteMovieValidation, deleteMovie);

module.exports = router;
