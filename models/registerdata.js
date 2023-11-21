const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

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
    tokens : [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

registerDataSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, "3d02259de9d846fc4b9b9ea990ae8dccd797c8a3e147c051ae9f0a8cc4e783522ede2bcb798fb015e87049f1d64bf5a84c6cd87f91b4fdd4703cd42b29ff0e10",  );
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.error("Error during token generation:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const registerData = mongoose.model('register', registerDataSchema);

module.exports = registerData;

