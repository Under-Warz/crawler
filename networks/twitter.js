var Twitter = require('twitter');
var _ = require('underscore');

module.exports = {
	init: function() {
		var client = new Twitter({
			consumer_key: config.twitter.consumer_key,
			consumer_secret: config.twitter.consumer_secret,
			access_token_key: config.twitter.access_token_key,
			access_token_secret: config.twitter.access_token_secret
		});

		this.crawl(client);
	},

	crawl: function(client) {
		// Tweets with tags
		if (config.twitter.tags.length > 0) {
			client.stream('statuses/filter', {track: config.twitter.tags.join(',')}, _.bind(function(stream) {
				stream.on('data', function(tweet) {

					if (config.debug) {
						console.log("Tweet: ", tweet);
					}

					var lang = tweet.lang;
					var isRetweeted = tweet.retweeted;
					var isReplyToTweet = (tweet.in_reply_to_status_id == null) ? false : true;
					var isReplyToUser = (tweet.in_reply_to_user_id == null) ? false : true;

					var languages = config.twitter.languages;
					var includeReplys = config.twitter.includeReplys;
					var includeRetweets = config.twitter.includeRetweets;

					var acceptThisTweet = false;

					// Check tweet language if needed
					if (languages.length > 0) {
						if (_.contains(languages, lang)) {
							acceptThisTweet = true;
						}
					}
					else {
						acceptThisTweet = true;
					}

					// Check is retweeted ?
					if (!includeRetweets && !isRetweeted && acceptThisTweet) {
						acceptThisTweet = true;
					}

					// Check is reply ?
					if (!includeReplys && !isReplyToTweet && !isReplyToUser) {
						acceptThisTweet = true;
					}
					else if (!includeReplys && (isReplyToTweet || isReplyToUser)) {
						acceptThisTweet = false;
					}

					// If tweet accepted, save it
					if (acceptThisTweet) {
						this.saveTweet(tweet);
					}
				});
				 
				stream.on('error', function(error) {
			    	throw error;
				});

				stream.on('limit', function(message) {
					throw message;
				});
			}, this));
		}

		// Tweets by user(s)
		if (config.twitter.usersToFollow.length > 0) {
			client.stream('statuses/filter', {follow: config.twitter.usersToFollow.join(',')}, _.bind(function(stream) {
				stream.on('data', function(tweet) {
					var isRetweeted = tweet.retweeted;
					var isReplyToTweet = (tweet.in_reply_to_status_id == null) ? false : true;
					var isReplyToUser = (tweet.in_reply_to_user_id == null) ? false : true;

					var includeReplys = config.twitter.includeReplys;
					var includeRetweets = config.twitter.includeRetweets;

					var acceptThisTweet = false;

					// Check is retweeted ?
					if (!includeRetweets && !isRetweeted) {
						acceptThisTweet = true;
					}

					// Check is reply ?
					if (!includeReplys && !isReplyToTweet && !isReplyToUser) {
						acceptThisTweet = true;
					}
					else if (!includeReplys && (isReplyToTweet || isReplyToUser)) {
						acceptThisTweet = false;
					}

					// If tweet accepted, save it
					if (acceptThisTweet) {
						this.saveTweet(tweet);
					}
				});
				 
				stream.on('error', function(error) {
			    	throw error;
				});

				stream.on('limit', function(message) {
					throw message;
				});
			}, this));
		}
	},

	saveTweet: function(tweet) {
		// Post tweet to a WS or save it into DB directly
	}
};