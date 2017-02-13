// Database Models
var User = require('../model/user.js');

module.exports = {

    getAll: function(callback) {
        User.find({}, function(err, users) {
            callback(err, users);
        });
    }
}