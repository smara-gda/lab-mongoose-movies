const express = require('express');
const Movie = require('./../model/movie');

const router = new express.Router();

// Handle GET request for movies
router.get('/movies', (req, res, next) => {
  Movie.find()
    .then((movies) => {
      console.log(movies);
      res.render('movies/index', { movies });
    })
    .catch((error) => {
      next(error);
    });
});
// movie create form handler
router.get('/movies/create', (req, res, next) => {
  res.render('movies/create');
});
//movie details page handler
router.get('/movies/:id', (req, res, next) => {
  const id = req.params.id;
  Movie.findById(id)
    .then((movie) => {
      console.log(movie);
      res.render('movies/show', { movie });
    })
    .catch((error) => {
      next(error);
    });
});

//adding movies
router.post('/movies', (req, res, next) => {
  const data = req.body;
  Movie.create({
    title: data.title,
    genre: data.genre,
    plot: data.plot
  })
    .then((movie) => {
      res.redirect('movies');
    })
    .catch((error) => {
      next(error);
    });
});

//deleting movies
router.post('/movies/:id/delete', (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(() => {
      console.log('Movie deleted');
      res.redirect('/movies');
    })
    .catch((error) => {
      next(error);
    });
});
//editing movie
router.get('/movies/:id/edit', (req, res, next) => {
  const id = req.params.id;
  Movie.findById(id)
    .then((movie) => {
      res.render('movies/edit', { movie });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/movies/:id', (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  const title = data.edittitle;
  const genre = data.editgenre;
  const plot = data.editplot;

  const updatedValues = {
    title,
    genre,
    plot
  };
  Movie.findByIdAndUpdate(id, updatedValues, { runValidators: true })
    .then(() => {
      res.redirect('/movies');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
