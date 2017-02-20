var carRest = require('../rest/car.js');
var auth = require('../config/auth.js');

module.exports = function(app) {
    app.route("/cars")
        .get(auth.jwtVerify, carRest.getCars)
        .post(auth.jwtVerify, carRest.postCar);
    app.route("/cars/:id")
        .get(auth.jwtVerify, carRest.getCar)
        .put(auth.jwtVerify, carRest.putCar)
        .delete(auth.jwtVerify, auth.isAdmin, carRest.deleteCar);
}