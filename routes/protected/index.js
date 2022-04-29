const router = require('express').Router();
const _utils = require('../../lib/utils');
const passport = require('passport');


router.get('/home', passport.authenticate('jwt', { session: false }),(req, res, next) => {
    res.json( _utils.returnResponse( false, 'Welcome!' )); 
});

module.exports = router;