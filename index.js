const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const device = require('express-device');
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()
const places = require('./routes/places');

const app = express();
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(device.capture());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/places', places);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.APP_PORT || 3000)