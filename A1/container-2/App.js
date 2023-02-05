const express = require('express');
const app = express();
const fs = require("fs")
const PORT = 5005;
var crypto = require('crypto');

/*
Reference:
[1] https://futurestud.io/tutorials/node-js-calculate-an-md5-hash
[2] https://odino.org/generating-the-md5-hash-of-a-string-in-nodejs/
*/

app.use(express.json());
app.post('/', (req, res) => {
    const name = `/etc/${req.body.file}`;
    console.log(name)
    var hash = crypto.createHash('md5').update(name).digest('hex');
    console.log(hash);
    res.send(hash);

})

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and  App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);