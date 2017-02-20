var carRest = require('../rest/car.js');
var secutiry = require('../config/auth.js');

module.exports = function(app) {
    app.route("/cars")
        // .get(secutiry.jwtVerify, carRest.getCars);
        .get(carRest.getCars)
        .post(carRest.postCar);
    app.route("/cars/:id")
        .get(carRest.getCar)
        .put(carRest.putCar)
        .delete(carRest.deleteCar);
}