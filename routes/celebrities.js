const express = require('express');
const Celebritie = require('./../model/celebrity');

const router = new express.Router();

// Handle GET request for celebrities
router.get('/celebrities', (req, res, next) => {
  Celebritie.find().then((celebrities) => {
    console.log(celebrities);
    if (celebrities === null) {
      const error = new Error('There are not celebrities');
      error.status = 404;
      next(error);
    } else {
      res.render('celebrities/index', { celebrities });
    }
  });
});

router.get('/celebrities/:id', (req, res, next) => {
  const id = req.params.id;
  Celebritie.findById(id)
    .then((celebrity) => {
      console.log(celebrity);
      if (celebrity === null) {
        const error = new Error('There is no celebrity by this id');
        error.status = 404;
        next(error);
      } else {
        res.render('celebrities/show', { celebrity });
      }
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
