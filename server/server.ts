//Runs with npm run express = npm run nodemon server/server.ts. 
//Can also use npm run node server/server.ts. Nodemon makes it that it updates if it detects changes. 

const express = require('express');
const compression = require("compression");
const _app_folder = 'dist/climacloset';
const app = express();
const fetcha = require('cross-fetch');

const port = 3000;
app.use(compression());
app.use(express.static(_app_folder));

var API_KEY = "8300f2d4182612b5d44c3fcb22ca0acc";
var API_URL_GPS = "https://api.openweathermap.org/data/2.5/weather?lat=";
var API_URL_CITY = "https://api.openweathermap.org/data/2.5/weather?q=";

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
module.exports = app;


//Endpoint for API call with GPS coordinates. 
app.get('/api/weather/:lat/:long', (req, res, next) => {
    var lat = req.params.lat; 
    var long = req.params.long; 
    var requestURL = API_URL_GPS +lat+"&lon="+long+"&appid="+API_KEY; 
    fetcha(requestURL)
    .then(response => {
       return response.json();
    })
    .then(data => {
        console.log(data);
        res.json(data); 
    })
    .catch(err => {
        console.log("Error in API call for GPS " + requestURL + "\n"+err);
    })
})

//Endpoint for API call with city. 
app.get('/api/weather/:city', (req, res, next) => {
    var city = req.params.city; 
    var requestURL = API_URL_CITY+city+"&appid="+API_KEY;

    fetcha(requestURL)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        res.json(data);
    })
    .catch(err => {
        console.log("Error in API call for city " + requestURL + "\n"+err)
    })
})