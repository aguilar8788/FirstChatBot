'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

function sendTextMessage(sender, text) {
  let messageData = { text:text };
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if(error) {
      console.log('Error sending messages: ', error);
    }else if(response.body.error) {
      console.log('Error: ', response.body.error);
    }
  })
}

function sendGenericMessage(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "Generic",
                "elements": [{
                    "title": "Common Computer Issues",
                    "subtitle": "What issue are you having?",
                    "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
                    "buttons": [{
                        "type": "Wont Turn On",
                        "title": "Wont Turn On"
                    }, {
                        "type": "No internet connection",
                        "title": "No internet connection",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }, {
                    "title": "Second card",
                    "subtitle": "Element #2 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                    "buttons": [{
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for second element in a generic bubble",
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

function receivedPostback(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;

  //The 'payload' param is a developer-defined field which is set in a postback
  //button for Structured Messages.
  var payload = event.postback.payload;

  console.log("Received postback for user %d and page %d with payload '%s' " + "at %d" , senderID, recipientID, payload, timeOfPostback);

  //When a postback is called, we'll send a message back to the sender to
  //let them know it was successful
  sendTextMessage(senderID, "Postback called");
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
  let messaging_events = req.body.entry[0].messaging;
  for (let i = 0; i < messaging_events.length; i++) {
    let event = req.body.entry[0].messaging[i];
    let sender = event.sender.id;
    if(event.message && event.message.text) {
      let text = event.message.text;
      if (text == 'Generic') {
        sendGenericMessage(sender);
        continue;
      }
      sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200));
    }
    if (event.postback) {
      let text = JSON.stringify(event.postback);
      sendTextMessage(sender, "Postback received: " + text.substring(0, 200), token);
      continue;
    }else if(messagingEvent.postback) {
      receivedPostback(messagingEvent);
    }
  }
  res.sendStatus(200);
})

const token = "EAAZAWuK4ZATCEBAJWQS2m2LyCpyQ9ZCavdlytdQjyTc96IQZAsQnOsLaGoCudTuFjQRs3FXb3CwFT8QHa0JUN4UVoCSXBHnHCsu0Dhcu20GpaudvDwHof5kZBfyJYkkv79dIPFIeYKEG61n1wjbHTAp6vI0UN5HlJJeoG2PJcwAZDZD"
