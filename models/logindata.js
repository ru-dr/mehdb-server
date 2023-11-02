const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const loginDataSchema = new mongoose.Schema({
  username: { type: String, required: true },
  encryptedPassword: { type: String, required: true },
  timeOfLogin: { type: String, required: true },
  date: { type: String, required: true },
  srno: { type: Number, required: true },
});

loginDataSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.encryptedPassword, salt);
    this.encryptedPassword = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const LoginData = mongoose.model('logindata', loginDataSchema);

module.exports = LoginData;
