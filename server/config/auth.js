var jwt = require('jsonwebtoken');

module.exports = {

    isAdmin: function(req, res, next) {
        if (req.decoded.user.role.localeCompare('admin') == 0) {
            next();
        } else {
            return res.status(403).json();
        }
    },

    jwtVerify: function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
                if (err) {
                    return res.status(403).json();
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).json();
        }
    }
}