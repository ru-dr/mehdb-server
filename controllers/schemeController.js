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
      // Check if the request includes a 'name' parameter
      const { name } = req.query;
      if (name) {
        const scheme = await schemeData.find({ schemename: name });
        res.status(200).json(scheme);
      } else {
        // If no 'name' parameter, fetch all schemes
        const schemes = await schemeData.find({});
        res.status(200).json(schemes);
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  getSchemeByName: async (req, res) => {
    try {
      const schemeName = req.params.name; 
      const schemes = await schemeData.find({ schemename: { $regex: schemeName, $options: 'i' } });
      res.status(200).json(schemes);
    } catch (error) {
      res.status(400).json({ message: error.message });
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
  },
  deleteSchemeDetails: async (req, res) => {
    try {
      const schemeId = req.params.id; 
      const deletedScheme = await schemeData.findByIdAndRemove(schemeId);
      res.status(200).json(deletedScheme);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  updateSchemeDetails: async (req, res) => {
    try {
      const schemeId = req.params.id; 
      const updatedSchemeData = req.body; 
      const updatedScheme = await schemeData.findByIdAndUpdate(schemeId, updatedSchemeData, { new: true });
      res.status(200).json(updatedScheme);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  updateSchemeDetailsByName: async (req, res) => {
    try {
      const schemeName = req.params.name; 
      const updatedSchemeData = req.body; 
      const updatedScheme = await schemeData.findOneAndUpdate({ schemename: schemeName }, updatedSchemeData, { new: true });
      res.status(200).json(updatedScheme);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
}

module.exports = schemeDetails;
