/**
 * Passport implementation
 */

const fs = require('fs');
const path = require('path');
const User = require('mongoose').model('User');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


const keyPath = path.join(__dirname, '../cert', '/id_rsa_pub.pem');
const key = fs.readFileSync(keyPath, 'utf8');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: key,
    algorithms: ['RS256']
};

module.exports = (passport) => passport.use(
    new JwtStrategy(options, (payload, done) => {
        User.find(({ _id: payload.sub }))
            .then(user => {
                if (user) return done(null, user);
                return done(null, false);

            })
            .catch(e => done(err, null));
    })
);