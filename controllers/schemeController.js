const { get } = require("mongoose");
const schemeData = require("../models/schemedata");
const { getCurrentTime, getCurrentDate } = require("../utils/utils");

const schemeDetails = {
  getAllSchemes: async (req, res) => {
    try {
      const schemes = await schemeData.find({});
      res.json({
        schemes: schemes,
        user: req.rootUser,
        message: "Scheme Fetched Successfully",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getSchemeByName: async (req, res) => {
    try {
      const schemeName = req.params.name;
      const schemes = await schemeData.find({
        schemename: { $regex: schemeName, $options: "i" },
      });
      res.json({
        schemes: schemes,
        user: req.rootUser,
        message: `Scheme with name ${schemeName} fetched successfully`,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getSchemeById: async (req, res) => {
    try {
      const schemeId = req.params.id;
      const scheme = await schemeData.findById(schemeId);
      if (!scheme) {
        res.status(404).json({ message: "Scheme not found" });
      } else {
        res.json({
          schemes: scheme,
          user: req.rootUser,
          message: `Scheme with id ${schemeId} fetched successfully`,
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addSchemeDetails: async (req, res) => {
    let schemeDetailsArray = req.body;

    // If it's a single entry, convert it to an array
    if (!Array.isArray(schemeDetailsArray)) {
      schemeDetailsArray = [schemeDetailsArray];
    }

    try {
      const data = await schemeData.find({});
      const totalSchemes = data.length;

      const newSchemeEntries = await schemeData.insertMany(
        schemeDetailsArray.map(
          (
            {
              schemename,
              ministry,
              desc,
              place,
              moneygranted,
              moneyspent,
              status,
              progress = (moneyspent / moneygranted) * 100,
              leadperson,
              lasteditedby,
            },
            index
          ) => ({
            schemename,
            ministry,
            desc,
            place,
            moneygranted,
            moneyspent,
            status,
            progress,
            leadperson,
            lasteditedby,
            timeOfschemeAdded: getCurrentTime(),
            date: getCurrentDate(),
            srno: totalSchemes + index + 1,
          })
        )
      );

      res.json({
        schemes: newSchemeEntries,
        message: "Scheme added successfully",
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  deleteSchemeDetails: async (req, res) => {
    const schemeId = req.params.id;

    try {
      const deletedScheme = await schemeData.findByIdAndDelete(schemeId);

      if (!deletedScheme) {
        return res.status(404).json({ message: "Scheme not found." });
      }

      res.json({
        schemes: deletedScheme,
        message: `Scheme with id ${schemeId} deleted successfully`,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteSchemeDetailsByName: async (req, res) => {
    const schemeName = req.params.name;

    try {
      const deletedScheme = await schemeData.findOneAndDelete({
        schemename: schemeName,
      });

      if (!deletedScheme) {
        return res.status(404).json({ message: "Scheme not found." });
      }

      res.json({
        schemes: deletedScheme,
        message: `Scheme with name ${schemeName} deleted successfully`,
      });
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
      res.json({
        schemes: deletedSchemes,
        message: `Schemes with names ${schemeNames} deleted successfully`,
      });
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

      res.json({ message: "Bulk delete successful", deletedSchemes });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },

  updateSchemeDetails: async (req, res) => {
    const updatedSchemeDataArray = Array.isArray(req.body)
      ? req.body
      : [req.body];

    try {
      const updatedSchemes = await Promise.all(
        updatedSchemeDataArray.map(async (updatedSchemeData) => {
          const schemeId = updatedSchemeData._id;

          // Set lasteditedby field to the username
          updatedSchemeData.lasteditedby = req.rootUser.firstName;
          
          // Get moneyspent and moneygranted from updatedSchemeData
          let { moneyspent, moneygranted } = updatedSchemeData;

          // Convert moneyspent and moneygranted to numbers
          moneyspent = parseFloat(moneyspent);
          moneygranted = parseFloat(moneygranted);

          // Check if moneyspent and moneygranted are valid numbers
          if (isNaN(moneyspent) || isNaN(moneygranted)) {
            throw new Error('Invalid money values');
          }

          updatedSchemeData.progress = (moneyspent / moneygranted) * 100;

          return await schemeData.findByIdAndUpdate(
            schemeId,
            updatedSchemeData,
            { new: true }
          );
        })
      );

      res.json({
        schemes: updatedSchemes,
        message: "Scheme updated successfully",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
};

module.exports = schemeDetails;
