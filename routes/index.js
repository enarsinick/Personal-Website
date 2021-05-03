var express = require('express');
var router = express.Router();
const { featured_projects } = require('../data/data.json');

// Selects random projects for DB
const randProject = (num) => {
  let relatedProjects = [];
  let counter = 0;
  let index;
  let prevIndex;

  // Pick random projects for JSON file that aren't 
  // the same as the one being viewed
  while (counter <= num) {
    index = (Math.floor(Math.random() * featured_projects.length));
    if (index !== prevIndex) {
      relatedProjects.push(featured_projects[index]);
      counter++;
      prevIndex = index;
    }
  }

  return relatedProjects;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  const homepageProjects = [];
  for (let i = 0; i <= 3; i++) {
    homepageProjects.push(featured_projects[i]);
  }
  res.render('index', {homepageProjects});
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { related: randProject(1) });
});

module.exports = router;
