'use strict'
require('dotenv').load();
const token = "EAAZAWuK4ZATCEBAJWQS2m2LyCpyQ9ZCavdlytdQjyTc96IQZAsQnOsLaGoCudTuFjQRs3FXb3CwFT8QHa0JUN4UVoCSXBHnHCsu0Dhcu20GpaudvDwHof5kZBfyJYkkv79dIPFIeYKEG61n1wjbHTAp6vI0UN5HlJJeoG2PJcwAZDZD"
const request = require('request')
module.exports = {
  send: function(sender) {
      let messageData = {
          "attachment": {
              "type": "template",
              "payload": {
                  "template_type": "generic",
                  "elements": [{
                      "title": "What computer issue are you experiencing?",
                      "buttons": [{
                          "type": "postback",
                          "title": "Won't Turn On",
                          "payload": "noBoot"
                      }, {
                          "type": "postback",
                          "title": "No Internet",
                          "payload": "noNetwork"
                      }, {
                          "type": "postback",
                          "title": "Other",
                          "payload": "other"
                    }],
                  }]
              }
          }
      }
      request({
          url: 'https://graph.facebook.com/v2.6/me/messages',
          qs: {access_token:token},
          method: 'POST',
          json: {
              recipient: {id:sender},
              message: messageData,
          }
      }, function(error, response, body) {
          if (error) {
              console.log('Error sending messages: ', error)
          } else if (response.body.error) {
              console.log('Error: ', response.body.error)
          }
      })
  }



}
