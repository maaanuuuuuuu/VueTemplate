const express = require("express"); // the express module
const app = express();              // instance of the server
const fs = require("fs");           // the filesytem module
const path = require("path");       // the path module (resolve dirname makes path relative to server.js)

const indexHTML = (() => {

    return fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
})();

app.use('/dist', express.static(path.resolve(__dirname, "./dist")));

require('./build/dev-server')(app);

// event handler
app.get('*', (req, res) => {
    res.write(indexHTML);
    res.end();
});

const port = process.env.PORT || 3004;

app.listen(port, () => {
    console.log("server started at http://localhost:"+port);
});