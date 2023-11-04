const { get } = require("mongoose");
const schemeData = require("../models/schemedata");
const {
  getCurrentTime,
  getCurrentDate,
  generateSrno,
} = require("../utils/utils");

const schemeDetails =  {
  getSchemeDetails: async (req, res) => {
    try {
      const agePops = await schemeData.find({});
      res.status(200).json(agePops);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    
  },

  addSchemeDetails: async (req, res) => {
    const { schemename, ministry, desc, place } = req.body;
    const timeOfschemeAdded = getCurrentTime();
    const date = getCurrentDate();
    const srno = generateSrno();

    try {
      const newSchemeEntry = new schemeData({
        schemename,
        ministry, // Include email in the data
        desc,
        place,
        timeOfschemeAdded,
        date,
        srno,
      });

      await newSchemeEntry.save();

      return res.status(201).json({ message: "Scheme Added successfully!" });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = schemeDetails;
