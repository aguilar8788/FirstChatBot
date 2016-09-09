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
                      },{
                        "type": "postback",
                        "title": "Screen Broke",
                        "payload": "phnScrnBrk"
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
  phoneWillNotBoot: ["First lets make sure your battery on your phone is charged. Plug it into a power source.",
                      "Next hold the power button down for 60 seconds to perform a reboot.",
                      "Finally, If the phone didn't automatically turn on from the last step try powering the phone back on."],
  phoneScreenBroke: ["I would suggest taking your phone in to have the screen replaced, because it is a tough job if you don't know what you are doing. However, I can give you some help. Here is some google search's on fixing a phone screen, but ultimately it depends on the phone you have. Here are some popular phone choices."]
}
