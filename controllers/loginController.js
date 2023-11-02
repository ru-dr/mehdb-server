const LoginData = require("../models/logindata");
const bcrypt = require("bcrypt");
const { getCurrentTime, generateSrno } = require("../utils/utils");

const loginController = {
  login: async (req, res) => {
    const { username, password } = req.body;
    const { timeOfLogin, date } = getCurrentTime();
    const srno = generateSrno();

    try {
      const existingUser = await LoginData.findOne({
        $or: [{ username }, { email: username }],
      });

      if (!existingUser) {
        return res
          .status(401)
          .json({ message: "User does not exist. Please register." });
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.encryptedPassword
      );

      if (!passwordMatch) {
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

      const newLoginEntry = new LoginData({
        username,
        encryptedPassword: existingUser.encryptedPassword,
        timeOfLogin,
        date,
        srno,
      });

      await newLoginEntry.save();

      return res.status(200).json({ message: "Login successful!" });
    } catch (error) {
      console.error("Error during password comparison:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = loginController;
