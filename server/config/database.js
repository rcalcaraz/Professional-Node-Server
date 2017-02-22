// Set database configuration
const dbHost = process.env.npm_package_config_db_host;
const dbPort = process.env.npm_package_config_db_port;

const options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };

if (process.env.node_env.localeCompare("test") == 0) {
    var dbName = process.env.npm_package_config_db_test_name;
    var databaseUrl = 'mongodb://' + dbHost + ':' + dbPort + '/' + dbName;
} else if (process.env.node_env.localeCompare("dev") == 0) {
    var dbName = process.env.npm_package_config_db_dev_name;
    var databaseUrl = 'mongodb://' + dbHost + ':' + dbPort + '/' + dbName;
} else {
    var dbName = process.env.npm_package_config_db_prod_name;
    var dbUser = process.env.npm_package_config_db_prod_user;
    var dbPass = process.env.npm_package_config_db_prod_pass;
    var dbAuth = process.env.npm_package_config_db_prod_authentication;
    var databaseUrl = 'mongodb://' + dbUser + ':' + dbPass + '@' + dbHost + ':' + dbPort + '/' + dbName + '?' + dbAuth;
}

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