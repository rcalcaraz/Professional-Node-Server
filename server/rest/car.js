var carDAO = require('../dao/car.js');

module.exports = {

    getCars: function(req, res) {
        carDAO.getAll(function(err, cars) {
            if (err) {
                res.status(500).json();
            } else if (cars.length == 0) {
                res.status(404).json();
            } else {
                res.status(200).json(cars);
            }
        });
    }
}