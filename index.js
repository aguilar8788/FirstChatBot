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
        if(makeResponseArray[j] == 'hello' || makeResponseArray[j] == 'hi') {
          setTimeout(function() {message.sendTextMessage(sender, "Hi there, what can I help you with?");}, 1000);
          setTimeout(function() {message.sendTextMessage(sender, "Type hints: 'I need help with my computer', 'My phone is not working', or 'I am not getting an internet connection'");}, 1000);
        }else if(makeResponseArray[j] == 'computer') {
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
        if(computer.computerWillNotBoot.length <= 0){
          setTimeout(function() {message.sendTextMessage(sender, confirmFixed(sender));}, 3000);
        }
        setTimeout(function() {message.sendTextMessage(sender, computer.computerWillNotBoot[0]);}, 3000);
        setTimeout(function() {computer.compConfirmation(sender);}, 6000);
        setTimeout(function() {computer.computerWillNotBoot.shift();}, 9000);
        continue;
      }else if(response == "cpNoNetwork" || response == "cpNoIntYes"){
        setTimeout(function() {message.sendTextMessage(sender, computer.computerNoInternet[0]);}, 3000);
        setTimeout(function() {computer.compNoIntConfirmation(sender);}, 6000);
        setTimeout(function() {computer.computerNoInternet.shift();}, 9000);
        continue;
      }else if(response == "cpvirus" || response == "cpVirusYes"){
        setTimeout(function() {message.sendTextMessage(sender, computer.computerVirus[0]);}, 3000);
        setTimeout(function() {computer.compVirusConfirmation(sender);}, 6000);
        setTimeout(function() {computer.computerVirus.shift();}, 9000);
        continue;
      }
    }

  }
  res.sendStatus(200);
})

const token = process.env.TOKEN;
