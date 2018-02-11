const express = require('express');
const bodyParser = require('body-parser');
const device = require('express-device');
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(device.capture());

const UniversitySchema = mongoose.Schema({
  latitude: Number,
  longitude: Number,
  radius: Number,
  device: Object,
  browser: String,
  university: Object,
});

const University = mongoose.model('University', UniversitySchema);

app.post('/places', function (req, res) {
  const {
    latitude,
    longitude,
    radius,
    university,
  } = req.body;

  University.create({
    latitude,
    longitude,
    radius,
    browser: req.headers['user-agent'],
    university,
    device: {
      type: req.device.type,
      name: req.device.name,
    },
  }, function (err, university) {
    if (err) return handleError(err);

    res.json(university);
  });
});

app.listen(3000)