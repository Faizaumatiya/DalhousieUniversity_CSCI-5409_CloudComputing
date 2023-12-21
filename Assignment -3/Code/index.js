const express = require('express');
const crypto = require('crypto');
const fs = require('fs');

// create an instance of the express app
const app = express();

// set up middleware to parse request body as JSON
app.use(express.json());


// load public and private keys from files
//https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm#
const publicKey = (fs.readFileSync('public_key.txt', 'utf-8'));
console.log(publicKey)
const privateKey = (fs.readFileSync('private_key.txt', 'utf-8'));
console.log(privateKey)



// define the /decrypt endpoint
app.post('/decrypt', (req, res) => {
    const decryptedMessage = crypto.privateDecrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    }, Buffer.from(req.body.message, 'base64')).toString();

    res.status(200).json({ response: decryptedMessage });

});

// define the /encrypt endpoint
app.post('/encrypt', (req, res) => {
    const encryptedMessage = crypto.publicEncrypt({
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    }, Buffer.from(req.body.message)).toString('base64');

    // retrieve the message to be encrypted from the request body
    res.status(200).json({ response: encryptedMessage });
});

// start the server
app.listen(3000, () => console.log('Server started on port 3000'));

//Reference:
//[1] https://www.tabnine.com/code/javascript/classes/node-rsa/NodeRSA
//[2] https://gist.github.com/sohamkamani/b14a9053551dbe59c39f83e25c829ea7
//[3] https://www.tabnine.com/code/javascript/functions/ts3.1%2Fcrypto/RSA_PKCS1_OAEP_PADDING
