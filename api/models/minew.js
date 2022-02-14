const mongoose = require('mongoose');

const minewSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    mac: { type: String, required: true },
    description: { type: String, required: true },
    
}, {versionKey: false });

module.exports = mongoose.model('Minew', minewSchema);
