var express = require('express');
var router = express.Router();

/* GET all work page. */
router.get('/', function(req, res, next) {
  res.render('work');
});

/* GET specific project page. */
router.get('/:id', function(req, res, next) {
  res.render('single-project');
});


module.exports = router;
