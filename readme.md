# Social networks Crawler

A NodeJS server that can crawl the following social networks contents

  - Twitter
  - FlickR
  - 500px
 
You'll be able to create and manage a live social wall or do anything you want with social contents.

This script is a bundle. You'll have to write some code to set or save all the data.

## Configuration
Every network's parameters are configurable throught PM2's config files locate in "config" directory.

```
"twitter": {
	"isEnabled": false, // Enable / disable Twitter crawler
	"consumer_key": "",
	"consumer_secret": "",
	"access_token_key": "",
	"access_token_secret": "",
	"tags": ["#test", "#dev"], // Search by tags
	"usersToFollow": [], // Get all user's tweets live
	"languages": [], // Get all languages
	"includeReply": false, // Include replies
	"includeRetweets": false // Include retweets
},
"flickr": {
	"isEnabled": false, // Enable / disable FlickR crawler
	"api_key": "",
	"api_secret": "",
	"tags": ["test"], // Get photos with tags
	"user_id": "", // Get user's photos
	"per_page": 100 // Max value : 500 
},
"api500px": {
	"isEnabled": false, // Enable / disable 500px crawler
	"consumer_key": "",
	"consumer_secret": "",
	"js_sdk_key": "",
	"tag": "", // Search by tag OR by term below
	"term": "Paris" // Search by term
}
```

### Note about Twitter
I use the Twitter's stream API to get live tweet from the service. It's more efficient for live social wall.

## Webservices configuration / saving
If your social wall's administration is outside the NodeJS server (like WordPress by exemple), you can use the "Webservice" file to set from where you want to get configuration (tags to search, users to follow...).

You'll be able to save throught the webservice your post data to an endpoint to save each post in WordPress by exemple... or simply save post into local database.

## Todos
- Add Instagram's posts
- Add Facebook fan page's posts
- Pagination for "non-streaming" APIs

