var dbHost = process.env.DB_HOST;
var dbPort = process.env.DB_PORT;
var dbName = process.env.DB_NAME;

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };
var databaseUrl = 'mongodb://' + dbHost + ':' + dbPort + '/' + dbName;

module.exports = function(mongoose) {
    mongoose.connect(databaseUrl, options);
    // Database  Listeners
    var db = mongoose.connection;

    db.on('error', function() {
        console.log("DB Connection error");
    });
};