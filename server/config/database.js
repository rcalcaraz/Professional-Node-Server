var databaseUrl = 'mongodb://localhost/mean-basic';

module.exports = function (mongoose) {
	mongoose.connect(databaseUrl);
};
