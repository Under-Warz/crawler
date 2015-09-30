var request = require('request');

module.exports = {
	/**
	 * Fetch social networks config from WS
	 */
	getOptions: function(callback) {
		request(config.webservices.get_options, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				if (callback) {
					callback(JSON.parse(body));
				}
			}
		});
	},

	/**
	 * Save Tweet post, Instagram post... into external DB via WS
	 */
	savePost: function(post, callback) {
		var params = {};

		// Construct your data to send here depend on post's type
		if (post.type == 'tweet') {

		}
		else if (post.type == 'instagram') {

		}

		request.post(config.webservices.save_post, form: params}, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				if (callback) {
					callback(JSON.parse(body));
				}
			}
		});
	}
};