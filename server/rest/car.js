var path = require('path');
var carDAO = require(path.join('..', 'dao', 'car.js'));
var Car = require(path.join('..', 'model', 'car.js'));

module.exports = {

    getAll: function(req, res) {
        carDAO.getAll(function(err, cars) {
            if (err) {
                res.status(500).json();
            } else {
                res.status(200).json(cars);
            }
        });
    },

    create: function(req, res) {
        var newCar = new Car(req.body);

        // Check for Bad Request
        if (!req.body.name) {
            res.status(400).json();
        } else {
            carDAO.save(newCar, function(err, car) {
                if (err) {
                    if (err.name == "ValidationError") {
                        res.status(409).json();
                    } else {
                        res.status(500).json();
                    }
                } else {
                    res.status(201).json(car);
                }
            });
        }
    },

    getById: function(req, res) {
        carDAO.getById(req.params.id, function(err, car) {
            if (err) {
                if (err.name == "CastError") {
                    res.status(404).json();
                } else {
                    res.status(500).json();
                }
            } else {
                res.status(200).json(car);
            }
        })
    },

    update: function(req, res) {
        var car = new Car(req.body);

        carDAO.update(req.params.id, car, function(err, updatedCar) {
            if (err) {
                if (err.name == "CastError") {
                    res.status(404).json();
                } else if (err.name = "ValidationError") {
                    res.status(409).json();
                } else {
                    res.status(500).json();
                }
            } else {
                res.status(200).json(updatedCar)
            }
        });
    },

    delete: function(req, res) {
        carDAO.delete(req.params.id, function(err, deletedCar) {
            if (err) {
                if (err.name == "CastError") {
                    res.status(404).json();
                } else {
                    res.status(500).json();
                }
            } else if (!deletedCar) {
                res.status(404).json();
            } else {
                res.status(200).json(deletedCar);
            }
        });
    }
}