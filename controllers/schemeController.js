const { get } = require("mongoose");
const schemeData = require("../models/schemedata");
const {
  getCurrentTime,
  getCurrentDate,
  generateSrno,
} = require("../utils/utils");

const schemeDetails = {
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
      const schemes = await schemeData.find({
        schemename: { $regex: schemeName, $options: "i" },
      });
      res.status(200).json(schemes);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  addSchemeDetails: async (req, res) => {
    const schemeDetailsArray = req.body; // Expecting an array of schemes

    try {
      const newSchemeEntries = await schemeData.insertMany(
        schemeDetailsArray.map(({ schemename, ministry, desc, place }) => ({
          schemename,
          ministry,
          desc,
          place,
          timeOfschemeAdded: getCurrentTime(),
          date: getCurrentDate(),
          srno: generateSrno(),
        }))
      );

      return res.status(201).json({
        message: "Schemes Added successfully!",
        data: newSchemeEntries,
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  deleteSchemeDetails: async (req, res) => {
    const schemeIds = req.body.schemeIds; // Expecting an array of scheme IDs

    try {
      const deletedSchemes = await schemeData.deleteMany({
        _id: { $in: schemeIds },
      });
      res.status(200).json(deletedSchemes);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteSchemeDetailsByName: async (req, res) => {
    const schemeNames = Array.isArray(req.body.schemeNames)
      ? req.body.schemeNames
      : [req.body.schemeNames];

    try {
      const deletedSchemes = await schemeData.deleteMany({
        schemename: { $in: schemeNames },
      });
      res.status(200).json(deletedSchemes);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  bulkDelete: async (req, res) => {
    try {
      // Expecting an array of identifiers in the request body
      const identifiers = req.body.identifiers;

      if (
        !identifiers ||
        !Array.isArray(identifiers) ||
        identifiers.length === 0
      ) {
        return res
          .status(400)
          .json({ message: "Invalid or empty identifiers array." });
      }

      // Assuming identifiers are scheme IDs, you can use deleteMany to delete multiple documents
      const deletedSchemes = await schemeData.deleteMany({
        _id: { $in: identifiers },
      });

      res
        .status(200)
        .json({ message: "Bulk delete successful", deletedSchemes });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },

  updateSchemeDetails: async (req, res) => {
    const updatedSchemeDataArray = req.body; // Expecting an array of updated scheme data

    try {
      const updatedSchemes = await Promise.all(
        updatedSchemeDataArray.map(async (updatedSchemeData) => {
          const schemeId = updatedSchemeData._id; // Assuming each updated scheme data includes the scheme ID
          return await schemeData.findByIdAndUpdate(
            schemeId,
            updatedSchemeData,
            { new: true }
          );
        })
      );

      res.status(200).json(updatedSchemes);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateSchemeDetailsByName: async (req, res) => {
    try {
      const schemeName = req.params.name;
      const updatedSchemeData = req.body;
      const updatedScheme = await schemeData.findOneAndUpdate(
        { schemename: schemeName },
        updatedSchemeData,
        { new: true }
      );
      res.status(200).json(updatedScheme);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = schemeDetails;
