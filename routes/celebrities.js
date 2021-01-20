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
      if (error.kind === 'ObjectId') {
        error.status = 404;
      }
      next(error);
    });
});

router.get('/celebrities/create', (req, res, next) => {
  res.render('celebrities/create');
});

router.post('/celebrities/', (req, res, next) => {
  const data = req.body;
  Celebritie.create({
    name: data.title,
    occupation: data.occupation,
    catchPhrase: data.catchPhrase
  })
    .then((celebrity) => {
      // I can't figure out why I am getting a 500 when I try to access the /celebrities/create form.
      // reason: Error: Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
      // I think it has something to do with the id right here below but I am really lost:
      res.redirect(`celebrities/${celebrity._id}`);
    })
    .catch((error) => {
      next(error);
    });
});
module.exports = router;
