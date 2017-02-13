var carRest = require('../rest/car.js');
var secutiry = require('../config/secutiry.js');

module.exports = function(app) {
    app.route("/cars")
        // .get(secutiry.jwtVerify, carRest.getCars);
        .get(carRest.getCars);
    app.route("/car")
        .post(carRest.postCar);
    app.route("/car/:id")
        .get(carRest.getCar)
        .put(carRest.putCar)
        .delete(carRest.deleteCar);
}