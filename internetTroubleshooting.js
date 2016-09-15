'use strict'
require('dotenv').load();
const request = require('request')
module.exports = {
  confirmInternetFixed: function (sender) {
      let messageData = {
          "attachment": {
              "type": "template",
              "payload": {
                  "template_type": "generic",
                  "elements": [{
                      "title": "Did this solve your issue?",
                      "buttons": [{
                          "type": "postback",
                          "title": "Yes",
                          "payload": "intfixYes"
                      }, {
                          "type": "postback",
                          "title": "No",
                          "payload": "intfixNo"
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
  intConfirmation: function (sender) {
      let messageData = {
          "attachment": {
              "type": "template",
              "payload": {
                  "template_type": "generic",
                  "elements": [{
                      "title": "Can you confirm that you completed this step?",
                      "buttons": [{
                          "type": "postback",
                          "title": "Yes",
                          "payload": "intYes"
                      }, {
                          "type": "postback",
                          "title": "No",
                          "payload": "intNo"
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
  internetTroubleshooting: ["Troubleshooting an internet issue is typically pretty straight forward. You just have to know where your router is. This is where your internet connection is coming from. Do you know where your router is?",
                            "Good, the first thing we will do is reboot it. So unplug it from the power source, and plug it back in.",
                            "Once the device is plugged back in, and the lights are back on insure that you have flashing lights. Specifically a light that has a lebel reading 'internet' or 'WAN'. If the lights are solid it indicates that you are not receiving data.",
                            "Next, insure all of the cables that are plugged into your router are plugged in nice and snug. No loose connections, or cables that have been damaged",
                            "Finally, try to connect to the internet again. If the internet is still down try a second device. If this still fails to fix the issue call your internet provider. You may have an outtage in your area. Alternatively we can trouble shoot your computer if you think that is the issue."
                          ],

}
