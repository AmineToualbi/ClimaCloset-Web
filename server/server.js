const express = require('express');
const compression = require("compression");
const _app_folder = 'dist/climacloset';
const app = express();

const port = 3000;
app.use(compression());
app.use(express.static(_app_folder));


app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
module.exports = app;