var request = require('request');

module.exports = {
	getOptions: function(callback) {
		request(config.webservices.get_options, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				if (callback) {
					callback(JSON.parse(body));
				}
			}
		});
	}
};