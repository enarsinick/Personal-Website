var express = require('express');
var router = express.Router();
const { featured_projects } = require('../data/data.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  // Loop over each feature project and add to array
  // then render that into the index view
  const projects = [];
  featured_projects.forEach(project => { projects.push(project)});
  res.render('index', {projects});
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  let relatedProjects = [];
  let counter = 0;
  let index;
  let prevIndex;

  // Pick 2 random projects for JSON file that aren't 
  // the same as the one being viewed
  while (counter <= 1) {
    index = (Math.floor(Math.random() * featured_projects.length));
    if (index !== prevIndex) {
      relatedProjects.push(featured_projects[index]);
      counter++;
      prevIndex = index;
    }
  }

  // Render the page
  res.render('about', { "related": relatedProjects });
});

module.exports = router;
