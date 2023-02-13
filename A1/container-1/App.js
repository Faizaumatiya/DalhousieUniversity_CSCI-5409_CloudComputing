const express = require('express');
const fs = require("fs")
const axios = require('axios');
const app = express();
const PORT = 5000;

/* Reference:
[1] https://www.geeksforgeeks.org/steps-to-create-an-express-js-application/amp/
[2] https://zetcode.com/javascript/axios/
[3] https://flaviocopes.com/express-send-json-response/
*/

app.use(express.json());
app.post('/checksum', (req, res) => {

    const name = `/etc/${req.body.file}`;
    if (req.body.file === null) {
        res.json({ file: req.body.file, error: "Invalid JSON input." });
    }
    else if (!fs.existsSync(name)) {
        res.json({ file: req.body.file, error: "File Not Found." });
    }
    else {
        async function doPostRequest() {
            let payload = { file: req.body.file };
            let result = await axios.post('http://host.docker.internal:5005/', payload);
            let data = result.data;
            console.log(data)
            res.json({ file: req.body.file, checksum: data });

        }
        doPostRequest();
    }

})

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and  App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);

}
);


