var api500px = require('500px');
var _ = require('underscore');

module.exports = {
	init: function() {
		var client = new api500px(config.api500px.consumer_key);

		this.crawl(client);
	},

	crawl: function(client) {
		// Search by tag
		if (config.api500px.tag != "") {
			client.photos.searchByTag(config.api500px.tag, {}, _.bind(function(error, results) {
				if (error) return console.error(error);

				if (results) {
					_.each(results.photos, _.bind(function(photo) {
						this.savePhoto(photo);
					}, this));
				}
			}, this));
		}
		else if (config.api500px.term != "") {
			client.photos.searchByTerm(config.api500px.term, {}, _.bind(function(error, results) {
				if (error) return console.error(error);

				if (results) {
					_.each(results.photos, _.bind(function(photo) {
						this.savePhoto(photo);
					}, this));
				}
			}, this));
		}
	},

	savePhoto: function(photo) {
		// Post photo to a WS or save it into DB directly
	}
};