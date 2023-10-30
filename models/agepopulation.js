const mongoose = require('mongoose');

const agepopulationSchema = new mongoose.Schema({

});

const AgePopulation = mongoose.model('agepopulation', agepopulationSchema);

module.exports = AgePopulation;