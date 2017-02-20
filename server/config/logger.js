var morgan = require('morgan');
var rfs = require('rotating-file-stream');
var fs = require('fs');

module.exports = function(app) {
    if (process.env.NODE_ENV == 'prod') {
        var logDirectory = __dirname + '/log';
        fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

        // create a rotating write stream
        var accessLogStream = rfs('access.log', {
            interval: '1d', // rotate daily
            path: logDirectory
        });

        app.use(morgan('combined', { stream: accessLogStream })); // apache combined log style
    } else if (process.env.NODE_ENV == 'dev') {
        app.use(morgan('dev')); // log every request to the console
    }
};