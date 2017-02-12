var dbHost = process.env.DB_HOST;
var dbPort = process.env.DB_PORT;

if (process.env.NODE_ENV !== 'test') {
    var dbName = process.env.DB_NAME;
} else {
    var dbName = process.env.DB_TEST_NAME;
}

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };
var databaseUrl = 'mongodb://' + dbHost + ':' + dbPort + '/' + dbName;

module.exports = function(mongoose) {
    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl, options);
    var db = mongoose.connection;

    db.on('error', function() {
        console.log("DB Connection error");
    });
};