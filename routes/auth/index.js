/**
 * Primary route file for authentication
 */
const router = require('express').Router();
const mongoose = require('mongoose');
const _utils = require('./../../lib/utils');
const { findUserByEmail } = require('./../../lib/usersUtil');
// Model
const User = mongoose.model('User');

// @todo Login
router.post('/login', (req, res, next) => { 
    User.findOne({ username: req.body.email})
        .then( user => {
            if (!user) return res.status(401).json( _utils.returnResponse(true, 'Could not find the user'));

            const isValid = _utils.isValidPassword(req.body.password, user.hash, user.salt)
            if (isValid) {
                const tokenObj = _utils.issueJWt(user);
                res.status(200).json( _utils.returnResponse(false, 'success', { user, token: tokenObj.token, expiresIn: tokenObj.expires }));
            } else {
                res.status(401).json( _utils.returnResponse( true, 'Invalid Email/Password'));
            }
        });
});

// Register User
router.post('/register', async (req, res, next) => {
    const existingUser = await findUserByEmail(req.body.email);
    if (!existingUser) {
        const { salt, hash } = _utils.genPassword(req.body.password);
        const newUser = new User({
            email: req.body.email,
            hash,
            salt,
            admin: false
        });
    
        await newUser.save()
            .then(user => {
                const jwt = _utils.issueJWt(user);
                return res.json( _utils.returnResponse(false, 'User successfully created',{ user: user, token: jwt.token, expiresIn: jwt.expires} ));
            })
            .catch(err => next(err));
    }else {
        return res.status(400).json(_utils.returnResponse(true, 'User already exist'));
    }
});

// Export module
module.exports = router;