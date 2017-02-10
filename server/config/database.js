var dbHost = process.env.DB_HOST;
var dbPort = process.env.DB_PORT;
var dbName = process.env.DB_NAME;
var databaseUrl = 'mongodb://' + dbHost + ':' + dbPort + '/' + dbName;

module.exports = function (mongoose) {
	mongoose.connect(databaseUrl);
};
