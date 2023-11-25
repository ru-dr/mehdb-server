const mongoose = require('mongoose');

const schemeDataSchema = new mongoose.Schema({
  schemename: { type: String, required: true },
  ministry: { type: String, required: true },
  desc: { type: String, required: true },
  place: { type: String, required: true },
  moneygranted: { type: String, required: true },
  moneyspent: { type: String, required: true },
  status: { type: String, required: true },
  progress: { type: Number, required: true },
  leadperson: { type: String, required: true },
  lasteditedby: { type: String, required: true },
  timeOfschemeAdded: { type: String, required: true },
  date: { type: String, required: true },
  srno: { type: Number, required: true },
});
 

const schemeData = mongoose.model('schemedata', schemeDataSchema);

module.exports = schemeData;

