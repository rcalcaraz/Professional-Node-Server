// TODO Path js

// Load variables and packages
require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

// Server configuration
app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.text());
app.use(methodOverride());
app.use(express.static('client'));

// Log
require('./server/config/logger.js')(app);

// Database connection
var db = require('./server/config/database.js')(mongoose);

// REST routes
require('./server/routes/user.js')(app);
require('./server/routes/car.js')(app);
require('./server/routes/session')(app);

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