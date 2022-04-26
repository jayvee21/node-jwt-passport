/**
 * Primary route file for authentication
 */
const router = require('express').Router();
const mongoose = require('mongoose');
// Model
const User = mongoose.model('User');

// @todo Login
router.post('/login', (req, res, next) => { res.send('ok'); });
router.post('/register', (req, res, next) => { res.send('ok'); });

// Export module
module.exports = router;