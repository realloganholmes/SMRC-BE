const mongoose = require('mongoose');

const recapSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  raceName: { type: String, required: true },
  time: { type: String, required: true },
  distance: { type: String, required: true },
  author: { type: String, required: true },
  hostUrl: { type: String, required: true },
  convertedToRFG: { type: Boolean, default: false },
  nominated: { type: Boolean, default: false },
  nominator: { type: String, default: null },
});

const recap = mongoose.model('Recap', recapSchema);

module.exports = recap;