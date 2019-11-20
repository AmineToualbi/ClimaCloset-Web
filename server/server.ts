//Runs with npm run express = npm run nodemon server/server.ts. 
//Can also use npm run node server/server.ts. Nodemon makes it that it updates if it detects changes. 

const express = require('express');
const compression = require("compression");
const _app_folder = 'dist/climacloset';
const app = express();

const port = 3000;
app.use(compression());
app.use(express.static(_app_folder));


app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
module.exports = app;

app.get('/api/weather/:lat/:long', (req, res, next) => {
    var lat = req.params.lat; 
    var long = req.params.long; 
    let gps = {
        lat: lat,
        long: long
    }
    res.json(gps);
})

app.get('/api/weather/:city', (req, res, next) => {
    var city = req.params.city; 
    let cityJSON = {
        city: city
    }
    res.json(cityJSON);
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