var userRest = require('../rest/user.js');

module.exports = function(app) {

    // TODO: Add middleware checking for admin endpoints
    app.route("/users")
        .get(userRest.getAll)
        .post(userRest.create);
    app.route("/users/:id")
        .get(userRest.getById)
        .delete(userRest.delete);
}