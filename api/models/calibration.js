const mongoose = require('mongoose');

const calibrationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    preparation: { type: String, required: true },
    value: { type: String, required: true },
    date: { type: String, required: true },
    user: { type: String, required: true },
}, {versionKey: false });

module.exports = mongoose.model('Calibration', calibrationSchema);
