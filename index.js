'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
var computer = require('./computerTroubleshooting');
var internet = require('./internetTroubleshooting');
var phone = require('./phoneTroubleshooting');
var message = require('./GenericMessage');







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
                        "payload": "fixYes"
                    }, {
                        "type": "postback",
                        "title": "No",
                        "payload": "fixNo"
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
  var logic;
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
          setTimeout(function() {computer.troubleshootComputer(sender);}, 2000);
          continue;
        }else if(makeResponseArray[j] == 'phone') {
          setTimeout(function() {message.sendTextMessage(sender, "Phone issues are the worst, lets see if we can figure out what is wrong. What kind of issue are you having?");}, 1000);
          setTimeout(function() {phone.troubleshootPhone(sender);}, 2000);
          continue;
        }else if(makeResponseArray[j] == 'internet') {
          setTimeout(function() {message.sendTextMessage(sender, "No internet = No fun. Let's try to get you up and running again. Trouble shooting routers typically follows the same steps, so lets start from the beginning.");}, 1000);
          setTimeout(function() {message.sendTextMessage(sender, internet.internetTroubleshooting[0]);}, 3000);
          setTimeout(function() {confirmation(sender);}, 4000);
          continue;
        }
      }



    }else if (event.postback) {
      var userChoice = event.postback.payload;
      let text = JSON.stringify(event.postback);
      var response = event.postback.payload;

      if(response == "cpNoBoot" || response == "cpYes"){
        setTimeout(function() {message.sendTextMessage(sender, computer.computerWillNotBoot[0]);}, 6000);
        setTimeout(function() {computer.compConfirmation(sender);}, 9000);
        computer.computerWillNotBoot.shift()
        continue;
      }
      // else if(userChoice == "yes") {
    //      computer.computerWillNotBoot.shift()
    //      if(computer.computerWillNotBoot.length > 0){
    //        setTimeout(function() {message.sendTextMessage(sender, "Good, lets move on...");}, 2000);
    //        setTimeout(function() {
    //          message.sendTextMessage(sender, computer.computerWillNotBoot[0])
    //          }, 6000);
    //        setTimeout(function() {confirmation(sender);}, 9000);
    //        }else {
    //          confirmFixed(sender);
    //        }
    //      }else if(userChoice == "no") {
    //        setTimeout(function() {message.sendTextMessage(sender, "Please finish the last task before we move on.");}, 2000);
    //        setTimeout(function() {confirmation(sender);}, 9000);
    //      }else if(userinput == "fixNo") {
    //        setTimeout(function() {message.sendTextMessage(sender, "Bummer, well here are some articles to look over that may help you further. If not I suggest taking the computer into a professional.");}, 2000);
    //    }
    //
    //
    //
    //
    }

  }
  res.sendStatus(200);
})

const token = "EAAZAWuK4ZATCEBAJWQS2m2LyCpyQ9ZCavdlytdQjyTc96IQZAsQnOsLaGoCudTuFjQRs3FXb3CwFT8QHa0JUN4UVoCSXBHnHCsu0Dhcu20GpaudvDwHof5kZBfyJYkkv79dIPFIeYKEG61n1wjbHTAp6vI0UN5HlJJeoG2PJcwAZDZD"
