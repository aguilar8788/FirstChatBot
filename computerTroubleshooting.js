'use strict'
require('dotenv').load();
const request = require('request')
module.exports = {
  troubleshootComputer: function(sender) {
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
                          "payload": "cpNoBoot"
                      }, {
                          "type": "postback",
                          "title": "No Internet",
                          "payload": "cpNoNetwork"
                      }, {
                          "type": "postback",
                          "title": "Virus",
                          "payload": "cpvirus"
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
  computerWillNotBoot: ["First lets try the basics. Please insure that your computer has power, or if it is a laptop insure your battery is charged.", "Next we should check if there are any lights on. This will indicate that we have power, which would mean there is an issue with the display.", "Finally, I want you to hold the power button down for 30 seconds, release the button, then finally try to turn the computer back on."]
}


//sendGenericMessage: function(sender) {
//     let messageData = {
//         "attachment": {
//             "type": "template",
//             "payload": {
//                 "template_type": "generic",
//                 "elements": [{
//                     "title": "Please Select From The Following",
//                     "buttons": [{
//                         "type": "postback",
//                         "title": "Computer",
//                         "payload": "Computer"
//                     }, {
//                         "type": "postback",
//                         "title": "Phone",
//                         "payload": "Phone"
//                     }, {
//                         "type": "postback",
//                         "title": "Internet",
//                         "payload": "Internet"
//                   }],
//                 }]
//             }
//         }
//     }
//     request({
//         url: 'https://graph.facebook.com/v2.6/me/messages',
//         qs: {access_token:process.env.TOKEN},
//         method: 'POST',
//         json: {
//             recipient: {id:sender},
//             message: messageData,
//         }
//     }, function(error, response, body) {
//         if (error) {
//             console.log('Error sending messages: ', error)
//         } else if (response.body.error) {
//             console.log('Error: ', response.body.error)
//         }
//     })
// },
