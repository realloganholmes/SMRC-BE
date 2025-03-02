const mongoose = require('mongoose');

const coolerNominationSchema = new mongoose.Schema({
  nominee: { type: String, required: true },
  date: { type: Date, required: true },
  comment: { type: String, default: '' },
  nominator: {type: String, required: true },
});

const coolerNomination = mongoose.model('Nomination', coolerNominationSchema);

module.exports = coolerNomination;