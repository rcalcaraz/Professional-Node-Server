var userDAO = require('../dao/user.js');

module.exports = {

    getUsers: function(req, res) {
        userDAO.getAll(function(err, users) {
            if (err) {
                res.status(500).json();
            } else {
                res.status(200).json(users);
            }
        });
    }
}