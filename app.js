require('dotenv').config();
const createError = require('http-errors');
const express = require('express');

const passport = require('./lib/passport');
const indexRouter = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`server is started at port ${PORT}`);
});
