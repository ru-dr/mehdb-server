const registerData = require("../models/registerdata");
const bcrypt = require("bcrypt");
const {
  getCurrentTime,
  getCurrentDate,
  generateSrno,
} = require("../utils/utils");

const registerUser = async (req, res) => {
  const { username, password, role, firstName, lastName, email } = req.body;
  const timeOfRegister = getCurrentTime();
  const date = getCurrentDate();

  const data = await registerData.find({});
  const srno = data.length + 1;
  console.log("Srno:", srno);

  try {
    const existingUser = await registerData.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res
        .status(401)
        .json({ message: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    const newRegisterEntry = new registerData({
      username,
      email, // Include email in the data
      encryptedPassword: hashedPassword,
      timeOfRegister,
      date,
      srno,
      role,
      firstName,
      lastName,
    });

    await newRegisterEntry.save();

    return res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = registerUser;
