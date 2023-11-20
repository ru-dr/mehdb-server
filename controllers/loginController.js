const LoginData = require("../models/logindata");
const registerData = require("../models/registerdata");
const bcrypt = require("bcrypt");
const { getCurrentTime, generateSrno, getCurrentDate } = require("../utils/utils.js");

const loginController = {
  login: async (req, res) => {
    const { username, password } = req.body;
    const timeOfLogin = getCurrentTime();
    const date = getCurrentDate();
    const srno = generateSrno();
    try {
      registerData.findOne({
        $or: [{ username }, { email: username }],
      }).then((existingUser) => {
        if (existingUser) {

          bcrypt.compare(password, existingUser.encryptedPassword).then((passwordMatch) => {
            if (passwordMatch) {
              const newLoginEntry = new LoginData({
                username,
                encryptedPassword: existingUser.encryptedPassword,
                timeOfLogin,
                date,
                srno,
              });

              newLoginEntry.save().then(() => {
                return res.status(200).json({ name: existingUser.name, username: existingUser.username, email: existingUser.email, message: "Login successful" });
              }).catch((error) => {
                console.error("Error during login:", error);
                return res.status(500).json({ message: "Internal server error" });
              });
            } else {
              console.log("Provided Password:", password);
              console.log(
                "Encrypted Password in Database:",
                existingUser.encryptedPassword
              );
              console.log("Password Match Result:", passwordMatch);

              return res
                .status(401)
                .json({ message: "Invalid password. Please try again." });
            }
          });

        }
      });
    } catch (error) {
      console.error("Error during password comparison:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

  },

};
module.exports = loginController;
