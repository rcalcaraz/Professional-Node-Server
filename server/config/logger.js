var morgan = require('morgan');

module.exports = function(app) {
    if (process.env.node_env == 'prod') {
        app.use(morgan('combined')); // apache combined log style
    } else if (process.env.node_env == 'dev') {
        app.use(morgan('dev')); // log every request to the console
    }
};