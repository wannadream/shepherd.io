require('dotenv').load();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');

require('./server/models/db');
require('./server/config/passport');

//var routes = require('./server/mvc/routes/index');
const routesApi = require('./server/rest_api/routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server', 'mvc', 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
//app.use('/', routes);
app.use('/api', routesApi);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
  // var err = new Error('Not Found');
  // err.status = 404;
  // next(err);
});

// error handler
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({
      'message': err.name + ': ' + err.message
    });
  } else {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
});

module.exports = app;