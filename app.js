const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require("mongoose");
const logger = require('morgan');
const methodOverride = require('method-override');
const indexRouter = require('./routes/index');
const fetch = require('node-fetch');

mongoose.connect("mongodb://localhost/solo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
// const Users = require('./models/users');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'moysecretniyklych',
  saveUninitialized: false,
}));

app.use(express.static(path.join(__dirname, 'public')));


app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "hbs")


app.use((req, res, next) => {
  const { user } = req.session;
  if (user) {
    app.locals.user = user;
    return next();
  }
  delete app.locals.user;
  return next();
});

app.use('/', indexRouter);

module.exports = app;
