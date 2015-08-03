var express = require('express');
var app = express();
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

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});