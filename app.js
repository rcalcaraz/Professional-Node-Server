// TODO: Change tests to add jsonwebtokens or change middleware for tests

// Load variables and packages
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
app.use(express.static('client'));

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev')); // log every request to the console
}

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