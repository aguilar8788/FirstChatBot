'use strict'
require('dotenv').load();
const request = require('request')
module.exports = {
  troubleshootPhone: function(sender) {
      let messageData = {
          "attachment": {
              "type": "template",
              "payload": {
                  "template_type": "generic",
                  "elements": [{
                      "title": "Choose from the following",
                      "buttons": [{
                          "type": "postback",
                          "title": "Won't Turn On",
                          "payload": "phnNoBoot"
                      }, {
                          "type": "postback",
                          "title": "No Internet",
                          "payload": "phnNoNetwork"
                      }, {
                          "type": "postback",
                          "title": "Virus",
                          "payload": "phnvirus"
                    }, {
                        "type": "postback",
                        "title": "Screen Broke",
                        "payload": "phnScrnBrk"
                  },{
                        "type": "postback",
                        "title": "Other",
                        "payload": "phnOther"
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
