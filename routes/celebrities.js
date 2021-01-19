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

module.exports = router;

/*
.then(resource => {
      if (resource === null) {
        const error = new Error('Resource does not exist.');
        error.status = 404;
        next(error);
      } else {
        res.render('resource/single', { resource: resource });
      }
    })
    .catch(error => {
      if (error.kind === 'ObjectId') {
        error.status = 404;
      }
      next(error);
    });
     */
