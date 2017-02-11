var carRest = require('../rest/car.js');

module.exports = function(app) {
    app.route("/cars")
        .get(carRest.getCars);
    app.route("/car")
        .post(carRest.postCar);
    app.route("/car/:id")
        .get(carRest.getCar)
        .put(carRest.putCar)
        .delete(carRest.deleteCar);
}