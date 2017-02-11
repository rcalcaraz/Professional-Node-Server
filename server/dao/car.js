// Database Models
var Car = require('../model/car.js');

module.exports = {

    getAll: function(callback) {
        Car.find({}, function(err, cars) {
            callback(err, cars);
        });
    },

    getById: function(id, callback) {
        Car.findById(id, function(err, car) {
            callback(err, car);
        });
    },

    save: function(car, callback) {
        car.save(function(err, car) {
            callback(err, car);
        });
    },

    update: function(id, updatedCar, callback) {
        updatedCar._id = id;
        Car.findByIdAndUpdate(id, updatedCar, { new: true }, function(err, updatedCar) {
            callback(err, updatedCar);
        });
    },

    delete: function(id, callback) {
        Car.findByIdAndRemove(id, function(err, deletedCar) {
            callback(err, deletedCar);
        });
    }
}