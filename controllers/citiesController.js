const CitiesData = require('../models/citiesdata');
const { getCurrentTime, getCurrentDate } = require('../utils/utils');

const citiesDataController = {
  getCitiesData: async (req, res) => {
    try {
      const citiesData = await CitiesData.find({});
      res.status(200).json({
        success: true,
        data: citiesData,
        user: req.rootUser,
        message: 'Cities data retrieved successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  addCitiesData: async (req, res) => {
    try {
      const citiesData = req.body;
      const data = await CitiesData.find({});
      const srno = data.length + 1;
      const currentDate = getCurrentDate(); // Assuming getCurrentDate is a function that returns the current date.

      // Add the serial number and date to the citiesData object
      const newCitiesData = new CitiesData({ ...citiesData, srno, date: currentDate });

      await newCitiesData.save();

      res.status(201).json({
        success: true,
        data: newCitiesData,
        message: 'Cities data added successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
};

module.exports = citiesDataController;
