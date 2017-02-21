var path = require('path');
var carRest = require(path.join('..', 'rest', 'car.js'));
var auth = require(path.join('..', 'config', 'auth.js'));

module.exports = function(app) {
    app.route("/cars")
        .get(auth.jwtVerify, carRest.getAll)
        .post(auth.jwtVerify, carRest.create);
    app.route("/cars/:id")
        .get(auth.jwtVerify, carRest.getById)
        .put(auth.jwtVerify, carRest.update)
        .delete(auth.jwtVerify, auth.isAdmin, carRest.delete);
}