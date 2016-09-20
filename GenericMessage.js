'use strict'
require('dotenv').load();
const request = require('request')
module.exports = {
   sendTextMessage: function(sender, text) {
    let messageData = { text:text };
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:process.env.TOKEN},
      method: 'POST',
      json: {
        recipient: {id:sender},
        message: messageData,
      }
    }, function(error, response, body) {
      if(error) {
        console.log('Error sending messages: ', error);
      }else if(response.body.error) {
        console.log('Error: ', response.body.error);
      }
    })
  },
  sendPicture: function(sender) {

    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:process.env.TOKEN},
      method: 'POST',
      json: {
        recipient: {id:sender},
        message: "messaging": [
          {
            "sender": {
              "id": "USER_ID"
            },
            "recipient": {
              "id": "PAGE_ID"
            },
            "timestamp": 1472672934259,
            "message": {
              "mid": "mid.1472672934017:db566db5104b5b5c08",
              "seq": 297,
              "attachments": [
                {
                  "title": "Facebook HQ",
                  "url": "https://www.facebook.com/l.php?u=https%....5-7Ocxrmg",
                  "type": "location",
                  "payload": {
                    "coordinates": {
                      "lat": 37.483872693672,
                      "long": -122.14900441942
                    }
                  }
                }
              ]
            }
          }
        ]
      }
    }, function(error, response, body) {
      if(error) {
        console.log('Error sending messages: ', error);
      }else if(response.body.error) {
        console.log('Error: ', response.body.error);
      }
    })
  }
}
