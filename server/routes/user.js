var userRest = require('../rest/user.js');

module.exports = function(app) {
    app.get('/api/users', userRest.getUsers);
}