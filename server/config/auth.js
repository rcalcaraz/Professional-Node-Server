var jwt = require('jsonwebtoken');

// TODO: Crearte middleware to check if user is admin

module.exports = {
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