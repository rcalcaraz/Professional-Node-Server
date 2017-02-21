var morgan = require('morgan');

module.exports = function(app) {
    if (process.env.NODE_ENV == 'prod') {
        app.use(morgan('combined')); // apache combined log style
    } else if (process.env.NODE_ENV == 'dev') {
        app.use(morgan('dev')); // log every request to the console
    }
};