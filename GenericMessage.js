'use strict'
require('dotenv').load();
const request = require('request')
module.exports = {
   sendTextMessage: function(sender, text) {
    let messageData = { text:text };
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:process.env.TOKEN},
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
  },
  sendPicture: function(sender) {
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:process.env.TOKEN},
      method: 'POST',
      json: {
        recipient: {id:sender},
        message: {
          "attachment": {
            "type": "image",
            "payload": {
              "url": "http://pisces.bbystatic.com//BestBuy_US/store/ee/2015/com/pm/nav_desktops_1115.jpg;maxHeight=288;maxWidth=520"
            }
          }
        }
      }
    }, function(error, response, body) {
      if(error) {
        console.log('Error sending messages: ', error);
      }else if(response.body.error) {
        console.log('Error: ', response.body.error);
      }
    })
  }
}
