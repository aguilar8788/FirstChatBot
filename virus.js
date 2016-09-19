'use strict'
require('dotenv').load();
const request = require('request')
module.exports = {
  counter: 0,
  computerVirus: ["First open a new web browser, and download a program called malwarebytes, which can be found at https://www.malwarebytes.com/antimalware/. THis is the virus software I use.",
                  "Next, run the malwarbytes program, and go through the prompts to install it.", "Once the program is installed, and it is running, click the scan button. This video is helpful if you are lost https://www.youtube.com/watch?v=RjrAceE-W4E",
                  "When the program finishes it will display any threats that it found. It will ask to quarantine the threats. Click yes to confirm.",
                  "Finally, restart your computer to see if it eliminated your virus issue.", "end"],
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
