const mongoose = require('mongoose');

const makerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    document: { type: String, required: false },
    status: { type: String, required: true }
}, {versionKey: false });

module.exports = mongoose.model('Maker', makerSchema);
