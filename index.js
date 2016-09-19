'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
var computer = require('./computerTroubleshooting');
var internet = require('./internetTroubleshooting');
var phone = require('./phoneTroubleshooting');
var message = require('./GenericMessage');
var virus = require('./virus')

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
      let confirmation = event.message.text;
      var makeTextLowerCase = text.toLowerCase();
      var makeResponseArray = makeTextLowerCase.split(' ')
      console.log(makeResponseArray);
      for(var j = 0; j < makeResponseArray.length; j++) {
        if(makeResponseArray[j] == 'computer') {
          setTimeout(function() {message.sendTextMessage(sender, "Hi there, What kind of computer issue are you having?");}, 1000);
          setTimeout(function() {computer.troubleshootComputer(sender);}, 2000);
          continue;
        }else if(makeResponseArray[j] == 'phone') {
          setTimeout(function() {message.sendTextMessage(sender, "Phone issues are the worst, lets see if we can figure out what is wrong. What kind of issue are you having?");}, 1000);
          setTimeout(function() {phone.troubleshootPhone(sender);}, 2000);
          continue;
        }else if(makeResponseArray[j] == 'internet') {
          setTimeout(function() {message.sendTextMessage(sender, "No internet = No fun. Let's try to get you up and running again. Trouble shooting routers typically follows the same steps, so lets start from the beginning.");}, 1000);
          setTimeout(function() {message.sendTextMessage(sender, internet.internetTroubleshooting[0]);}, 3000);
          setTimeout(function() {internet.intConfirmation(sender);}, 4000);
          continue;
        }else if(makeResponseArray[j] == 'got') {
          setTimeout(function() {message.sendTextMessage(sender, virus.computerVirus[virus.counter]);}, 3000);
          setTimeout(function() {virus.counter++;}, 4000);
          continue;
        }else if(makeResponseArray[j] == 'finished' || makeResponseArray[j] == 'done'){
          setTimeout(function() {message.sendTextMessage(sender, virus.computerVirus[virus.counter]);}, 3000);
          // setTimeout(function() {virus.compVirusConfirmation(sender);}, 6000);
          setTimeout(function() {virus.counter++;}, 4000);
          continue;
        }else if(makeResponseArray[j] == 'end') {
          setTimeout(function() {message.sendTextMessage(sender, virus.confirmVirusFixed(sender));}, 3000);
          virus.counter = 0;
        }
      }
      }else if (event.postback) {
        var userChoice = event.postback.payload;
        let text = JSON.stringify(event.postback);
        var response = event.postback.payload;

        if(response == "cpNoBoot" || response == "cpYes"){
          if(computer.computerWillNotBoot[computer.counter] == "end"){
            setTimeout(function() {message.sendTextMessage(sender, computer.confirmNoBootFixed(sender));}, 3000);
            computer.counter = 0;
          }else{
            setTimeout(function() {message.sendTextMessage(sender, computer.computerWillNotBoot[computer.counter]);}, 3000);
            setTimeout(function() {computer.compConfirmation(sender);}, 6000);
            setTimeout(function() {computer.counter++;}, 4000);
            continue;
          }

        }else if(response == "cpNoNetwork" || response == "cpNoIntYes"){
          if(computer.computerNoInternet[computer.counter] == "end"){
            setTimeout(function() {message.sendTextMessage(sender, computer.confirmNetworkFixed(sender));}, 3000);
            computer.counter = 0;
          }else {
            setTimeout(function() {message.sendTextMessage(sender, computer.computerNoInternet[computer.counter]);}, 3000);
            setTimeout(function() {computer.compNoIntConfirmation(sender);}, 6000);
            setTimeout(function() {computer.counter++;}, 4000);
            continue;
          }
        }else if(response == "cpvirus" || response == "cpVirusYes"){
          if(virus.computerVirus[virus.counter] == "end"){
            setTimeout(function() {message.sendTextMessage(sender, virus.confirmVirusFixed(sender));}, 3000);
            virus.counter = 0;
          }else {
            setTimeout(function() {message.sendTextMessage(sender, virus.computerVirus[virus.counter]);}, 3000);
            // setTimeout(function() {virus.compVirusConfirmation(sender);}, 6000);
            setTimeout(function() {virus.counter++;}, 4000);
            continue;
          }
        }else if (response == "bootfixNo"){
          setTimeout(function() {message.sendTextMessage(sender, "Well sorry this was not helpful.")}, 3000);
          setTimeout(function() {message.sendTextMessage(sender, "Here are some resources from the internet that may help. \n http://www.pcadvisor.co.uk/how-to/laptop/how-fix-pc-that-wont-boot-3528959/ \n" +
                                                                  "http://www.howtogeek.com/173828/what-to-do-when-windows-wont-boot/ \n" + "http://www.macworld.co.uk/how-to/mac/10-steps-take-when-your-mac-wont-start-up-or-turn-on-3423817/")}, 4000);
          setTimeout(function() {message.sendTextMessage(sender, "If you would like help with a new issue just ask. Have a good day.")}, 5000);
        }else if (response == "intYes"){
          if(computer.computerVirus[computer.counter] == "end"){
            setTimeout(function() {message.sendTextMessage(sender, internet.confirmInternetFixed(sender));}, 3000);
            computer.counter = 0;
          }else {
            setTimeout(function() {message.sendTextMessage(sender, internet.internetTroubleshooting[computer.counter]);}, 3000);
            setTimeout(function() {internet.intConfirmation(sender);}, 6000);
            setTimeout(function() {computer.counter++;}, 4000);
            continue;
          }
        }
      }
    }
  res.sendStatus(200);
})

const token = process.env.TOKEN;
