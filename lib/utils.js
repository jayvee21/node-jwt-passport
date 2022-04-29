const crypto = require('crypto');
const fs = require('fs');
const jsonwebtoken = require('jsonwebtoken');
const path = require('path');

// Read the private Key
const keyPath = path.join(__dirname, '../cert', 'id_rsa_priv.pem');
const privateKey = fs.readFileSync(keyPath, 'utf8');


// Generate `salt` and `hash` for user.
function genPassword (password) {
    let salt = crypto.randomBytes(32).toString();
    let hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return { salt, hash };
}

// Validate password provided once it is converted to hash, if same value as DB hash for the User.
function isValidPassword (password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

// Generate error
function returnResponse(error = false, message = '', otherFields = {}) {
    return  { error, message, ...otherFields }
}

// Issue JWT - to a logged in User
function issueJWt (user) {
    const _id = user._id;
    const expiresIn = '1d';

    const payload = {
        sub:_id,
        iat: Date.now()
    };

    const signedToken = jsonwebtoken.sign(payload, privateKey, {
        expiresIn: expiresIn, algorithm: 'RS256'
    });

    return {token: `Bearer ${signedToken}`, expires: expiresIn }
}

module.exports.isValidPassword = isValidPassword;
module.exports.genPassword = genPassword;
module.exports.returnResponse = returnResponse;
module.exports.issueJWt = issueJWt;