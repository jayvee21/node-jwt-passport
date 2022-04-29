/**
 * Utility helpers for User's
 */
const mongoose = require('mongoose');
const User = mongoose.model('User');
// Find user by email
module.exports.findUserByEmail = async (email) => {
    const userData = await User.findOne({ email });
    return ( userData !== null) ? userData : false;
}