'use strict'
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
