const uploadCsv = require("../models/uploadCsv");
const { generateSrno } = require("../utils/utils.js");

const uploadController = {
  upload: async (req, res) => {
    const { csvData } = req.body;

    try {
      if (!csvData) {
        return res.status(400).json({ message: "CSV data is required" });
      }

      console.log("done");

      const newCsvEntry = new uploadCsv({
        csvData,
      });

      await newCsvEntry.save();

      return res.status(200).json({ message: "Upload successful" });
    } catch (error) {
      console.error("Error during password comparison:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = uploadController;
