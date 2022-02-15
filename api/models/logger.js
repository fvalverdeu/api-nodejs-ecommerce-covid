const mongoose = require('mongoose');

const loggerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: { type: String, required: true },
    description: { type: String, required: true },
    
}, {versionKey: false });

module.exports = mongoose.model('Logger', loggerSchema);
