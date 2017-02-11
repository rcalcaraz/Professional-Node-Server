// Load variables and packages

/* TODO
mocha (Check test database)
jsonwebtokens
*/

require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var app = express();

// Server configuration
app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(morgan('dev')); // log every request to the console
app.use(express.static('client'));

// Database connection
var db = require('./server/config/database.js')(mongoose);

// REST routes
require('./server/routes/car.js')(app);

// Routing
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

// Launcher
var port = process.env.NODE_PORT;

app.listen(port, function() {
    console.log("Listening on port: " + port);
});

module.exports = app; // for testing