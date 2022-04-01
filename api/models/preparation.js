const mongoose = require('mongoose');

const preparationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    description: { type: String, required: true },
    min: { type: String, required: true },
    max: { type: String, required: true },    
}, {versionKey: false });

module.exports = mongoose.model('Preparation', preparationSchema);
