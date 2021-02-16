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
  let relatedProjects = [];
  let counter = 0;
  let index;
  let prevIndex;

  // If the ID in the URL is great than the amount
  // of projects we have, then redirect to the error page
  if (id >= featured_projects.length) {
    return res.redirect('/error');
  }

  // Pick 2 random projects for JSON file that aren't 
  // the same as the one being viewed
  while (counter < 2) {
    index = (Math.floor(Math.random() * featured_projects.length));
    if (index !== parseInt(id) && index !== prevIndex) {
      relatedProjects.push(featured_projects[index]);
      counter++;
      prevIndex = index;
    }
  }

  const project = featured_projects[id];

  res.render('single-project', {
    "project": project,
    "related": relatedProjects
  });

});


module.exports = router;
