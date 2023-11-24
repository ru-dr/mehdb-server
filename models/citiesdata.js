const mongoose = require('mongoose');

const citiesDataSchema = new mongoose.Schema({
    talukaName: { type: String, required: true },
    noOfSchools: { type: String, required: true },
    noOfHospitals: { type: String, required: true },
    noOfColleges: { type: String, required: true },
    noOfUniversities: { type: String, required: true },
    noOfRailwayStations: { type: String, required: true },
    noOfBusStations: { type: String, required: true },
    noOfPostOffices: { type: String, required: true },
    noOfPoliceStations: { type: String, required: true },
    noOfFireStations: { type: String, required: true },
    date: { type: String, required: true },
    srno: { type: Number, required: true },
});

const citiesData = mongoose.model('citiesdata', citiesDataSchema);

module.exports = citiesData;