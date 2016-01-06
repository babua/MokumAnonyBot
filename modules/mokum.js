'use strict';

var config = require("../config/config.js"),
request = require('request'),

request = request.defaults({
    jar: true
});


var mokumModule = {
    commands: [
        'ma'
    ],

    onCommand: function (command, query, platform, state) {
        var mokumCallback = function (err, response, body) {
            if (err) {
                platform.error(err, state);
                return;
            }
			if (response.statusCode == 200) {
			    platform.message("Succesfully posted to Mokum", state);
			} else {
			    platform.failMessage("Posting to Mokum failed",state);
			}
        };
        mokumCallback.state = state;
        platform.typing(state);

        request(
            {
                method: 'POST',
                url: 'https://mokum.place/api/v1/posts.json',
                headers: {
                	"X-API-Token" : config.mokum.token
                },
                json: {
                	post: {
                		"timelines": ["user"], 
                		"text": query,
                        "nsfw" : true
                	}
                	
                },
            },
            mokumCallback
        );

    }
};


module.exports = mokumModule;