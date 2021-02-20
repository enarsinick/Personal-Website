var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
const { featured_projects } = require('./data/data.json');


var indexRouter = require('./routes/index');
var workRouter = require('./routes/work');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/work', workRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  let relatedProjects = [];
  let counter = 0;
  let index;
  let prevIndex;
  
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

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
  res.render('error', { "related": relatedProjects });
});

module.exports = app;
