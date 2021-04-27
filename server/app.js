var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userRouter = require('./routes/userRouter');
var feeRouter = require('./routes/feeRouter');
var courseRouter = require('./routes/courseRouter');
var studentRouter = require('./routes/studentRouter');
var timeTableRouter = require('./routes/timeTableRouter');
var noticeRouter = require('./routes/noticeRouter');
var cors = require('cors');
var app = express();
const connect = mongoose.connect("mongodb://mongo/collegeServer?retryWrites=true&w=majority",{ useNewUrlParser: true ,'useFindAndModify': false});

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });

var app = express();

app.use(
  cors({
    origin: "*",
  })
);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user', userRouter);
app.use('/fees',feeRouter);
app.use('/courses',courseRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
