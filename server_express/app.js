const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// .env import
require('dotenv').config();
// Socket.io import
require('./services/socket.io')
// Cors import
const cors = require('cors');

// Routes imports
const vacRouter = require('./routes/api/vac');
const userRouter = require('./routes/api/user');
const followRouter = require('./routes/api/follow');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use cors
app.use(cors());

// Use Routes
app.use('/api/vac', vacRouter);
app.use('/api/user', userRouter);
app.use('/api/follow', followRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
