'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
var computer = require('./computerTroubleshooting');
var message = require('./GenericMessage');

var computerWillNotBoot = ["First lets try the basics. Please insure that your computer has power, or if it is a laptop insure your battery is charged.", "Next we should check if there are any lights on. This will indicate that we have power, which would mean there is an issue with the display.", "Finally, I want you to hold the power button down for 30 seconds, release the button, then finally try to turn the computer back on."]






function confirmation(sender) {
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
                        "payload": "yes"
                    }, {
                        "type": "postback",
                        "title": "No",
                        "payload": "no"
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

function confirmFixed(sender) {
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
                        "payload": "yes"
                    }, {
                        "type": "postback",
                        "title": "No",
                        "payload": "no"
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

function noPower() {

}


// function receivedPostback(event) {
//   var senderID = event.sender.id;
//   var recipientID = event.recipient.id;
//   var timeOfPostback = event.timestamp;
//
//   //The 'payload' param is a developer-defined field which is set in a postback
//   //button for Structured Messages.
//   var payload = event.postback.payload;
//
//   console.log("Received postback for user %d and page %d with payload '%s' " + "at %d" , senderID, recipientID, payload, timeOfPostback);
//
//   //When a postback is called, we'll send a message back to the sender to
//   //let them know it was successful
//   sendTextMessage(senderID, "Postback called");
// }

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

app.post('/webhook/', function (req, res) {

  let messaging_events = req.body.entry[0].messaging;
  for (let i = 0; i < messaging_events.length; i++) {
    let event = req.body.entry[0].messaging[i];
    let sender = event.sender.id;
    if(event.message && event.message.text) {
      let text = event.message.text;
      var makeTextLowerCase = text.toLowerCase();
      var makeResponseArray = makeTextLowerCase.split(' ')
      console.log(makeResponseArray);
      for(var j = 0; j < makeResponseArray.length; j++) {
        if(makeResponseArray[j] == 'computer') {
          setTimeout(function() {message.sendTextMessage(sender, "What kind of computer issue are you having?");}, 1000);
          continue;
        }else if(makeResponseArray[j] == 'phone') {
          setTimeout(function() {message.sendTextMessage(sender, "Phone issues are the worst, lets see if we can figure out what is wrong. What kind of issue are you having?");}, 1000);
          continue;
        }else if(makeResponseArray[j] == 'internet') {
          setTimeout(function() {message.sendTextMessage(sender, "No internet = No fun. Let's try to get you up and running again. Trouble shooting routers typically follows the same steps, so lets start from the beginning.");}, 1000);
          continue;
        }

      }

      // setTimeout(function() {computer.sendGenericMessage(sender); }, 2000);


    }else if (event.postback) {
      var userChoice = event.postback.payload;


      let text = JSON.stringify(event.postback);
      var response = event.postback.payload;


      if(response == "Computer"){
        computer.troubleshootComputer(sender);
        continue;
      }
      else if (response == "noBoot") {
        setTimeout(function() {message.sendTextMessage(sender, "Hmmm, well lets figure this out together.");}, 3000);
        setTimeout(function() {message.sendTextMessage(sender, computerWillNotBoot[0]);}, 6000);

        setTimeout(function() {confirmation(sender);}, 9000);

        continue;
      }
      else if(userChoice == "yes") {
        computerWillNotBoot.shift()
        if(computerWillNotBoot.length > 0){
          setTimeout(function() {message.sendTextMessage(sender, "Good, lets move on...");}, 2000);
          setTimeout(function() {
            message.sendTextMessage(sender, computerWillNotBoot[0])
            }, 6000);
          setTimeout(function() {confirmation(sender);}, 9000);
          continue;
        }else {
          confirmFixed(sender);
        }
      }else if(userChoice == "no") {
        setTimeout(function() {message.sendTextMessage(sender, "Please finish the last task before we move on.");}, 2000);
        setTimeout(function() {confirmation(sender);}, 9000);
        continue;
      }
    }

  }
  res.sendStatus(200);
})

const token = "EAAZAWuK4ZATCEBAJWQS2m2LyCpyQ9ZCavdlytdQjyTc96IQZAsQnOsLaGoCudTuFjQRs3FXb3CwFT8QHa0JUN4UVoCSXBHnHCsu0Dhcu20GpaudvDwHof5kZBfyJYkkv79dIPFIeYKEG61n1wjbHTAp6vI0UN5HlJJeoG2PJcwAZDZD"
