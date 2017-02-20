var carRest = require('../rest/car.js');
var auth = require('../config/auth.js');

// TODO: Add isAdmin check and add it to tests

module.exports = function(app) {
    app.route("/cars")
        //.post(auth.jwtVerify,auth.isAdmincarRest.postCar);
        .get(auth.jwtVerify, carRest.getCars)
        .post(carRest.postCar);
    app.route("/cars/:id")
        .get(carRest.getCar)
        .put(carRest.putCar)
        .delete(carRest.deleteCar);
}