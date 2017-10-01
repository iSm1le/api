const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, lowercase: true, trim: true, required: true },
    password: { type: String, required: true },
    services: String,
    created: { type: Date, default: Date.now }
});


/* eslint-disable func-names */
UserSchema.methods.comparePassword = function(pass) {
    return bcrypt.compareSync(pass, this.password);
};
/* eslint-enable func-names */

let User = mongoose.model('User', UserSchema);

module.exports = User;
