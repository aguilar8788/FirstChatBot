'use strict'
require('dotenv').load();
const request = require('request')
module.exports = {
   sendGenericMessage: function(sender) {
      let messageData = {
          "attachment": {
              "type": "template",
              "payload": {
                  "template_type": "generic",
                  "elements": [{
                      "title": "Please Select From The Following",
                      "buttons": [{
                          "type": "postback",
                          "title": "Computer",
                          "payload": "Computer"
                      }, {
                          "type": "postback",
                          "title": "Phone",
                          "payload": "Phone"
                      }, {
                          "type": "postback",
                          "title": "Internet",
                          "payload": "Internet"
                    }],
                  }]
              }
          }
      }
      request({
          url: 'https://graph.facebook.com/v2.6/me/messages',
          qs: {access_token:process.env.TOKEN},
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
  },
  troubleshootComputer: function(sender) {
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
          qs: {access_token:process.env.TOKEN},
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
