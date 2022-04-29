/**
 * Indipendent script file to generate Certificate `.pem' files.
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function generateKeyPair() {
     const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096, // bits - standard for RSA keys
        publicKeyEncoding: {
            type: 'pkcs1', // Public key cryptography standards 1
            format: 'pem' // most common formatting choice
        },
        privateKeyEncoding: {
            type: 'pkcs1', // Public key cryptography standards 1
            format: 'pem'
        }
    });
    // Create the public key file
    fs.writeFileSync( path.join(__dirname, '../cert/id_rsa_pub.pem'), keyPair.publicKey);
    // Create the private key file
    fs.writeFileSync( path.join(__dirname,'../cert/id_rsa_priv.pem'), keyPair.privateKey);
};

// Generate files
generateKeyPair();

