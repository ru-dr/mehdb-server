const mongoose = require('mongoose');

const loginDataSchema = new mongoose.Schema({
  username: { type: String, required: true },
  encryptedPassword: { type: String, required: true },
  timeOfLogin: { type: String, required: true },
  date: { type: String, required: true },
  srno: { type: Number, required: true },
});


const LoginData = mongoose.model('logindata', loginDataSchema);

module.exports = LoginData;

