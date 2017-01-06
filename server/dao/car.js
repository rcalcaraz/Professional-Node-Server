// Database Models
var car = require('../model/car.js');

module.exports = {
	
	getAll: function(callback){
		car.find({}, function (err, cars) {
  			callback(err,cars);
		}); 
	}
}

