const mongoose = require('mongoose');

const rfgSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  raceName: { type: String, required: true },
  time: { type: String, required: true },
  distance: { type: String, required: true },
  isPR: { type: Boolean, required: true },
  isAPR: { type: Boolean, required: true },
  points: { type: Number, required: true },
});

const rfg = mongoose.model('RFG', rfgSchema);

module.exports = rfg;