'use strict'
require('dotenv').load();
const request = require('request')
module.exports = {
  counter: 0,
  confirmNoBootFixed: function (sender) {
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
                          "payload": "bootfixYes"
                      }, {
                          "type": "postback",
                          "title": "No",
                          "payload": "bootfixNo"
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
  confirmNetworkFixed: function (sender) {
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
                          "payload": "networkfixYes"
                      }, {
                          "type": "postback",
                          "title": "No",
                          "payload": "networkfixNo"
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
  confirmVirusFixed: function (sender) {
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
                          "payload": "virusfixYes"
                      }, {
                          "type": "postback",
                          "title": "No",
                          "payload": "virusfixNo"
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
  compConfirmation: function (sender) {
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
                          "payload": "cpYes"
                      }, {
                          "type": "postback",
                          "title": "No",
                          "payload": "cpNo"
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
  compNoIntConfirmation: function (sender) {
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
                          "payload": "cpNoIntYes"
                      }, {
                          "type": "postback",
                          "title": "No",
                          "payload": "cpNoIntNo"
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
  compVirusConfirmation: function (sender) {
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
                          "payload": "cpVirusYes"
                      }, {
                          "type": "postback",
                          "title": "No",
                          "payload": "cpVirusNo"
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
  computerWillNotBoot: ["Hmm, well first lets try the basics. Please insure that your computer has power, or if it is a laptop insure your battery is charged.",
                        "Next we should check if there are any lights on. This will indicate that we have power. If you do have power, but no display, it may indicate an issue with your display.",
                        "Finally, I want you to hold the power button down for 30 seconds, release the button, then finally try to turn the computer back on. Sometimes computers can go into sleep mode, and give may give issues getting the computer to come back on.", "end"],
  computerNoInternet: ["First lets perform a reboot on your computer. This seems elementary, but it solves a lot of issues.",
                       "Next, insure that your wifi on your computer is enabled. This will depend on your computer, so Google your device if you don't know how to check this.",
                       "If all of the steps above were performed, and confirmed your issue may be a faulty wifi card, or it may be that your internet is the issue.", "end"],
  computerVirus: ["First open a new web browser, and download a program called malwarebytes, which can be found at https://www.malwarebytes.com/antimalware/. THis is the virus software I use.",
                  "Next, run the malwarbytes program, and go through the prompts to install it.", "Once the program is installed, and it is running, click the scan button. This video is helpful if you are lost https://www.youtube.com/watch?v=RjrAceE-W4E",
                  "When the program finishes it will display any threats that it found. It will ask to quarantine the threats. Click yes to confirm.",
                  "Finally, restart your computer to see if it eliminated your virus issue.", "end"]

}
