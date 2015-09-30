var Flickr = require('node-flickr');
var _ = require('underscore');

module.exports = {
	init: function() {
		var flickr = new Flickr({
			api_key: config.flickr.api_key
		});

		this.crawl(flickr);
	},

	crawl: function(client) {
		var params = {
			per_page: config.flickr.per_page
		};

		// Search by tags
		if (config.flickr.tags.length > 0) {
			params.tags = config.flickr.tags.join(',');
		}

		// Search by user id
		if (config.flickr.user_id != "") {
			params.user_id = config.flickr.user_id;
		}

		client.get("photos.search", params, _.bind(function(err, result){
		    if (err) return console.error(err);
		    
		    if (result) {
		    	if (config.debug) {
		    		console.log(result);
		    	}

		    	_.each(result.photos.photo, _.bind(function(photo) {
		    		this.savePhoto(photo);
		    	}, this));
		    }
		}, this));
	},

	savePhoto: function(photo) {
		// Construct urls (https://www.flickr.com/services/api/misc.urls.html)
		var image_base = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret;
		var images_url = {
			normal: image_base + ".jpg",
			s: image_base + "_s.jpg",
			q: image_base + "_q.jpg",
			t: image_base + "_t.jpg",
			m: image_base + "_m.jpg",
			n: image_base + "_n.jpg"
		};

		var user_profile_url = "https://www.flickr.com/people/" + photo.owner + "/";

		// Post photo to a WS or save it into DB directly
	}
};