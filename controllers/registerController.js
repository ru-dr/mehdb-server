const LoginData = require("../models/logindata");
const bcrypt = require("bcrypt");
const {
  getCurrentTime,
  getCurrentDate,
  generateSrno,
} = require("../utils/utils");

const registerUser = async (req, res) => {
  const { username, password, role, firstName, lastName, email } = req.body;
  const timeOfLogin = getCurrentTime();
  const date = getCurrentDate();
  const srno = generateSrno();

  try {
    const existingUser = await LoginData.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res
        .status(401)
        .json({ message: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    const newLoginEntry = new LoginData({
      username,
      email, // Include email in the data
      encryptedPassword: hashedPassword,
      timeOfLogin,
      date,
      srno,
      role,
      firstName,
      lastName,
    });

    await newLoginEntry.save();

    return res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = registerUser;
