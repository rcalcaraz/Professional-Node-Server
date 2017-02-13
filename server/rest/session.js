var jwt = require('jsonwebtoken');

module.exports = {

    create: function(req, res) {
        // TODO: Check valid user and pass and if it is admin
        var token = jwt.sign({
                user: {
                    name: req.body.name,
                    password: req.body.password,
                    admin: true // Check before in the database
                }
            },
            process.env.JWT_SECRET);

        if (token) {
            var session = { token: token };
            res.status(200).json(session);
        } else {
            res.status(500).json();
        }
    }
}