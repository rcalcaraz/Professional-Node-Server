var carRest = require('../rest/car.js');
var secutiry = require('../config/secutiry.js');

module.exports = function(app) {
    app.get('/cars', secutiry.jwtVerify, carRest.getCars);
}