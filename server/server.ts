//Runs with npm run express = npm run nodemon server/server.ts. 
//Can also use npm run node server/server.ts. Nodemon makes it that it updates if it detects changes. 

const express = require('express');
const compression = require("compression");
const _app_folder = 'dist/climacloset';
const app = express();
const fetcher = require('node-fetch');

const port = 3000;
app.use(compression());
app.use(express.static(_app_folder));

var API_KEY = "8300f2d4182612b5d44c3fcb22ca0acc";
var API_URL_GPS = "https://api.openweathermap.org/data/2.5/weather?lat=";
var API_URL_CITY = "https://api.openweathermap.org/data/2.5/weather?q=";
var proxy = "https://cors-anywhere.herokuapp.com/";  


app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
module.exports = app;

app.get('/api/weather/:lat/:long', (req, res, next) => {
    var lat = req.params.lat; 
    var long = req.params.long; 
    var requestURL = API_URL_GPS +lat+"&lon="+long+"&appid="+API_KEY; 
    
    fetcher(requestURL)
    .then(response => {
       return response.json();
    })
    .then(data => {
        console.log(data);
        res.json(data); 
    })

})

app.get('/api/weather/:city', (req, res, next) => {
    var city = req.params.city; 
    var requestURL = API_URL_CITY+city+"&appid="+API_KEY;

    fetcher(requestURL)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        res.json(data);
    })
})

app.get('/api/emergency/:id', (req, res, next) => {
    var id = req.params.id;
    console.log('The id: ' + id);
    let myID = {
        value: id
    };
    res.json(myID);
});


app.get('*.ico', function(){})

app.get('/api/name', (req, res) => {
    let myName = {
        name: "Amine TOUALBI"
    };

    res.json(myName);
})