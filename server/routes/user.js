var userRest = require('../rest/user.js');

module.exports = function(app) {

    // Add middleware checking for admin endpoints
    app.route("/users")
        .get(userRest.getAll);
    app.route("/user")
        .post(userRest.create);
    app.route("/user/:id")
        .get(userRest.getById)
        .delete(userRest.delete);
}