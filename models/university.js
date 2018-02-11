const mongoose = require('mongoose');

const UniversitySchema = mongoose.Schema({
  latitude: Number,
  longitude: Number,
  radius: Number,
  device: Object,
  browser: String,
  university: Object,
});

const University = mongoose.model('University', UniversitySchema);

module.exports = University;