const mongoose = require('mongoose');

const recapSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  raceName: { type: String, required: true},
  time: { type: String, required: true},
  distance: { type: String, required: true},
  author: {type: String, required: true },
  hostUrl: {type: String, required: true},
});

const recap = mongoose.model('Recap', recapSchema);

module.exports = recap;