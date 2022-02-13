const mongoose = require('mongoose');

const minewSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    description: { type: String, required: true },
    
}, {versionKey: false });

module.exports = mongoose.model('Minew', minewSchema);
