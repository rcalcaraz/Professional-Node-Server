var path = require('path');
var userRest = require(path.join('..', 'rest', 'user.js'));
var auth = require(path.join('..', 'config', 'auth.js'));

module.exports = function(app) {

    app.route("/users")
        .get(auth.jwtVerify, auth.isAdmin, userRest.getAll)
        .post(userRest.create);
    app.route("/users/:id")
        .get(userRest.getById)
        .delete(auth.jwtVerify, auth.isAdmin, userRest.delete);
}