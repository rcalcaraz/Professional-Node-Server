const dbName = process.env.DB_NAME;

// Set database configuration
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbAuth = process.env.DB_AUTHENTICATION;
const options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };
const databaseUrl = 'mongodb://' + dbUser + ':' + dbPass + '@' + dbHost + ':' + dbPort + '/' + dbName + '?' + dbAuth;

module.exports = function(mongoose) {

    // Connect
    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl, options);
    var db = mongoose.connection;

    // Listener for error
    db.on('error', function() {
        console.log("DB Connection error");
    });
};