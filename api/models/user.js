const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    rol: { type: String, required: true, default: 'CLIENT' },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    document: { type: String, required: true },
    status: { type: String, required: true, default: 'ACTIVE' }
}, { versionKey: false });

module.exports = mongoose.model('User', userSchema);