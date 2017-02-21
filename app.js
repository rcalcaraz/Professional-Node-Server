// TODO Path js

// Load variables and packages
require('dotenv').config();
var path = require('path');
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
require(path.join(__dirname, 'server', 'config', 'logger.js'))(app);

// Database connection
var db = require(path.join(__dirname, 'server', 'config', 'Database.js'))(mongoose);

// REST routes

require(path.join(__dirname, 'server', 'routes', 'user.js'))(app);
require(path.join(__dirname, 'server', 'routes', 'car.js'))(app);
require(path.join(__dirname, 'server', 'routes', 'session.js'))(app);

// Routing
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Launcher
var port = process.env.NODE_PORT;

app.listen(port, function() {
    console.info("Listening on port: " + port);
});

module.exports = app; // for testing