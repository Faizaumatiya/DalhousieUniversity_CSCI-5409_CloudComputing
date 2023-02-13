//const CryptoJS = require("crypto-js");
const express = require('express');
const app = express();
const fs = require("fs")
const PORT = 5005;
var crypto = require('crypto');


/*
Reference:
[1] https://futurestud.io/tutorials/node-js-calculate-an-md5-hash
[2] https://odino.org/generating-the-md5-hash-of-a-string-in-nodejs/
[3] https://nodejs.dev/en/learn/reading-files-with-nodejs/
*/

app.use(express.json());
app.post('/', (req, res) => {
    const name = `/etc/${req.body.file}`;
    fs.readFile(name, "utf8", function (err, data) {
        if (err) throw err;
        var hash = crypto.createHash('md5').update(data.toString()).digest('hex');
        console.log("The MD5 checksum of", name, "is", hash);
        res.send(hash)

    });
})

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and  App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);