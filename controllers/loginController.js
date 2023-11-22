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
      const existingUser = await registerData.findOne({
        $or: [{ username }, { email: username }],
      });

      if (existingUser) {
        const passwordMatch = await bcrypt.compare(password, existingUser.encryptedPassword);

        if (passwordMatch) {
          const newLoginEntry = new LoginData({
            username,
            encryptedPassword: existingUser.encryptedPassword,
            timeOfLogin,
            date,
            srno,
          });

          // Assuming generateAuthToken returns a Promise
          const token = await existingUser.generateAuthToken();
          console.log("Token:", token);

          const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds

          res.cookie('token', token, {
            secure: true,
            httpOnly: true,
            sameSite: 'None',
            expires: new Date(Date.now() + oneDayInMilliseconds),
          });



          await newLoginEntry.save();

          return res.status(200).json({
            username: existingUser.username,
            email: existingUser.email,
            role: existingUser.role,
            fname: existingUser.firstName,
            lname: existingUser.lastName,
            message: "Login successful"
          });
        } else {
          console.log("Provided Password:", password);
          console.log("Encrypted Password in Database:", existingUser.encryptedPassword);
          console.log("Password Match Result:", passwordMatch);

          return res.status(401).json({ message: "Invalid password. Please try again." });
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = loginController;