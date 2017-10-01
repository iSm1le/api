const mongoose = require('mongoose');

module.exports = mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true, trim: true, required: true },
    password: { type: String, required: true },
    services: String
}));
