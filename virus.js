'use strict'
require('dotenv').load();
const request = require('request')
module.exports = {
  counter: 0,
  computerVirus: ["Yuck, I hate bugs. Let's try to get rid of them. First open a web browser of your choice, go to https://www.malwarebytes.com/antimalware/, and download the program. If you need help just ask.",
                  "Next, run the malwarbytes program, and go through the prompts to install it.", "Once the program is installed, and you have it up and running, click the scan button. This video is helpful if you are lost with this step https://www.youtube.com/watch?v=RjrAceE-W4E",
                  "The program will scan your computer files for any threats. When it is finished it will display any threats that it found. Then it will ask if you want to quarantine the threats. Click yes to confirm.", "end"],
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
virusThreatsConfirmation: function (sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Did Malwarebytes find any threats?",
                    "buttons": [{
                        "type": "postback",
                        "title": "Yes",
                        "payload": "mbVirusYes"
                    }, {
                        "type": "postback",
                        "title": "No",
                        "payload": "mbVirusNo"
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
  }
}
