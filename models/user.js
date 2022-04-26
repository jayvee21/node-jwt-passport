const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    hash: String,
    salt: String
}, { timestamps: true });


mongoose.model('User', UserSchema);