// Load variables and packages

/* TODO
Morgan
Body Parser
.env
mocha
static files
path
winston
refactor
guia estilo rest
*/

var express = require('express');
var mongoose = require('mongoose');
var app = express();

// Database connection
var db = require('./server/config/database.js')(mongoose);

// Rest routes
require('./server/routes/car.js')(app);

// Routing

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

// Launcher
app.listen(3000, function () {
  console.log('==== Basic Server for MEAN stack started ====');
  console.log("Listening on port: 3000");
});