const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sku: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    unit: {type: String, required: false},
    expiration: {type: String, required: false},
    model: {type: String, required: false},
    quantity: {type: String, required: true},
    price: {type: Number, required: true},
    // categories: [String],
    category: {type: String, required: true},
    images: [String],
    status: { type: String, required: true }
}, {versionKey: false });

module.exports = mongoose.model('Product', productSchema);
