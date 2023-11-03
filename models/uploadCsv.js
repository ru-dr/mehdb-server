const mongoose = require('mongoose');

const uploadDataSchema = new mongoose.Schema({
    csvData: { type: JSON, required: true },
});

const uploadData = mongoose.model('uploaddata', uploadDataSchema);

module.exports = uploadData;

