// Check test mode to set the database
if (process.env.NODE_ENV !== 'test') {
    var dbName = process.env.DB_NAME;
} else {
    var dbName = process.env.DB_TEST_NAME;
}

// Set database configuration
var dbHost = process.env.DB_HOST;
var dbPort = process.env.DB_PORT;
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };
var databaseUrl = 'mongodb://' + dbHost + ':' + dbPort + '/' + dbName;

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