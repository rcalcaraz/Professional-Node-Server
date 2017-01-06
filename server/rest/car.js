var carDAO = require('../dao/car.js');

module.exports = {
	
	getCars: function (req, res) {
		carDAO.getAll(function(err,cars){
			if(err){
				res.status(500);
			}
			else if(cars.length == 0){
				res.status(404);
			}
			else{
				res.json(cars);
			}			
		});
	}
}
