const mongoose = require('mongoose');

const registerDataSchema = new mongoose.Schema({
    username: { type: String, required: true },
    encryptedPassword: { type: String, required: true },
    email : { type: String, required: true },
    timeOfRegister : { type: String, required: true },
    date : { type: String, required: true },
    srno : { type: Number, required: true },
    role : { type: String, required: true },
    firstName : { type: String, required: true },
    lastName : { type: String, required: true },
});


const registerData = mongoose.model('register', registerDataSchema);

module.exports = registerData;

