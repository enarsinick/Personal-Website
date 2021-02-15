var express = require('express');
var router = express.Router();
const { featured_projects } = require('../data/data.json');

/* GET all work page. */
router.get('/', function(req, res, next) {
  res.render('work');
});

/* GET specific project page. */
router.get('/:id', function(req, res, next) {
  const {id} = req.params;

  // If the ID in the URL is great than the amount
  // of projects we have, then redirect to the error page
  if (id >= featured_projects.length) {
    return res.redirect('/error');
  }
  
  const project = featured_projects[id];
  res.render('single-project', project);
});


module.exports = router;
