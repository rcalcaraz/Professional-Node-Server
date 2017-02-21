var path = require('path');
var userDAO = require(path.join('..', 'dao', 'user.js'));

module.exports = {

    getAll: function(req, res) {
        userDAO.getAll(function(err, users) {
            if (err) {
                res.status(500).json();
            } else {
                res.status(200).json(users);
            }
        });
    },

    getById: function(req, res) {
        userDAO.getById(req.params.id, function(err, users) {
            if (err) {
                if (err.name = "CastError") {
                    res.status(404).json();
                } else {
                    res.status(500).json();
                }
            } else {
                res.status(200).json(users);
            }
        })
    },

    create: function(req, res) {
        if (!req.body.name || !req.body.password || !req.body.role) {
            res.status(400).json();
        }
        userDAO.create(req.body, function(err, user) {
            if (err) {
                if (err.name == "ValidationError") {
                    res.status(409).json();
                } else {
                    res.status(500).json();
                }
            } else {
                res.status(201).json(user);
            }
        });
    },

    delete: function(req, res) {
        userDAO.delete(req.params.id, function(err, user) {
            if (err) {
                if (err.name = "CastError") {
                    res.status(404).json();
                } else {
                    res.status(500).json();
                }
            } else {
                res.status(200).json(user);
            }
        })
    }
}