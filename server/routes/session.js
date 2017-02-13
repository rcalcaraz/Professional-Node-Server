var sessionRest = require('../rest/session.js');

module.exports = function(app) {
    app.route("/session")
        .post(sessionRest.create);
}