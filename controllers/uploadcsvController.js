const LoginData = require("../models/logindata");
const uploadCsv = require("../models/uploadCsv");
const { getCurrentTime, generateSrno, getCurrentDate } = require("../utils/utils.js");

const uploadController = {
  upload: async (req, res) => {
    const { csvData } = req.body;
    const timeOfLogin = getCurrentTime();
    const date = getCurrentDate();
    const srno = generateSrno();
    try {
        console.log("csvData:", csvData);
        const newCsvEntry = new uploadCsv({
            csvData
          });
      
          await newCsvEntry.save();
    } catch (error) {
      console.error("Error during password comparison:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

  },

};
module.exports = uploadController;
