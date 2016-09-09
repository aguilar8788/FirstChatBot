'use strict'
require('dotenv').load();
const request = require('request')
module.exports = {
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
                        "Next we should check if there are any lights on. This will indicate that we have power, which would mean there is an issue with the display.",
                        "Finally, I want you to hold the power button down for 30 seconds, release the button, then finally try to turn the computer back on."],
  computerNoInternet: ["First lets perform a reboot on your computer. This seems elementary, but it solves a lot of issues.",
                       "Next, insure that your wifi on your computer is enabled. This will depend on your computer, so Google your device if you don't know how to check this.",
                       "If all of the steps above were performed, and confirmed your issue may be a faulty wifi card, or it may be that your internet is the issue."],
  computerVirus: ["First open a new web browser, and download a program called malwarebytes, which can be found at https://www.malwarebytes.com/antimalware/. THis is the virus software I use.",
                  "Next, run the malwarbytes program, and go through the prompts to install it.", "Once the program is installed, and it is running, click the scan button. This video is helpful if you are lost https://www.youtube.com/watch?v=RjrAceE-W4E",
                  "When the program finishes it will display any threats that it found. It will ask to quarantine the threats. Click yes to confirm.",
                  "Finally, restart your computer to see if it eliminated your virus issue."],
  cpNoBootLogic: function(userinput) {
    if(userinput == "yes") {
     computer.computerWillNotBoot.shift()
     if(computer.computerWillNotBoot.length > 0){
       setTimeout(function() {message.sendTextMessage(sender, "Good, lets move on...");}, 2000);
       setTimeout(function() {
         message.sendTextMessage(sender, computer.computerWillNotBoot[0])
         }, 6000);
       setTimeout(function() {confirmation(sender);}, 9000);
       continue;
       }else {
         confirmFixed(sender);
       }
     }else if(userinput == "no") {
       setTimeout(function() {message.sendTextMessage(sender, "Please finish the last task before we move on.");}, 2000);
       setTimeout(function() {confirmation(sender);}, 9000);
       continue;
     }else if(userinput == "fixNo") {
       setTimeout(function() {message.sendTextMessage(sender, "Bummer, well here are some articles to look over that may help you further. If not I suggest taking the computer into a professional.");}, 2000);
   }
  }
}





      // else if (response == "cpNoBoot") {
      //   setTimeout(function() {message.sendTextMessage(sender, "Hmmm, well lets figure this out together.");}, 3000);
      //   setTimeout(function() {message.sendTextMessage(sender, computer.computerWillNotBoot[0]);}, 6000);
      //
      //   setTimeout(function() {confirmation(sender);}, 9000);
      //
      //   continue;
      // }
      //





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
