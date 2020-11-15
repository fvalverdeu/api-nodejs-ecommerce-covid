const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    parent: { type: String, required: true },
    path: { type: String, required: true },
    
}, {versionKey: false });

module.exports = mongoose.model('Category', categorySchema);
