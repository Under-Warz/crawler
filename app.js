var express = require('express');
var app = express();
var webservices = require('./webservices');
var twitter = require('./twitter');

// Load config file from PM2
config = JSON.parse(process.env.config);

// If craw twitter enabled
if (config.twitter.isEnabled) {
	twitter.init();
}

app.get('/', function (req, res) {
  res.send(config);
});

// Cron to get options from WS
var CronJob = require('cron').CronJob; // Every 5 minutes
if (config.webservices.get_options != null) {
	webservices.getOptions(function(response) {
		console.log(response);
	});

	new CronJob('*/5 * * * *', function() {
		webservices.getOptions(function(response) {
			
		});
	}, null, true, 'Europe/Paris');
}

var server = app.listen(config.port, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Starting %s at http://%s:%s', process.env.name, host, port);
});