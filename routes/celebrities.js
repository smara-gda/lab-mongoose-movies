const express = require('express');
const Celebrity = require('./../model/celebrity');

const router = new express.Router();

// Handle GET request for celebrities
router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      console.log(celebrities);
      res.render('celebrities/index', { celebrities });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/celebrities/create', (req, res, next) => {
  res.render('celebrities/create');
});

router.get('/celebrities/:id', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findById(id)
    .then((celebrity) => {
      console.log(celebrity);
      res.render('celebrities/show', { celebrity });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/celebrities', (req, res, next) => {
  const data = req.body;
  Celebrity.create({
    name: data.name,
    occupation: data.occupation,
    catchPhrase: data.catchPhrase
  })
    .then((celebrity) => {
      res.redirect('celebrities');
    })
    .catch((error) => {
      next(error);
    });
});
// DELETE CELEBRITY
router.post('/celebrities/:id/delete', (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(() => {
      console.log('Celebrity removed');
      res.redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    });
});

// EDIT CELEBERITY

router.get('/celebrities/:id/edit', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findById(id)
    .then((celebrity) => {
      res.render('celebrities/edit', { celebrity });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/celebrities/:id', (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  const name = data.editname;
  const occupation = data.editoccupation;
  const catchPhrase = data.editcatchPhrase;

  const updatedValues = {
    name,
    occupation,
    catchPhrase
  };
  Celebrity.findByIdAndUpdate(id, updatedValues, { runValidators: true })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
