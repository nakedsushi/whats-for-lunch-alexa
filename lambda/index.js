/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const messages = {
  LAUNCH_MESSAGE: 'Stop debating about what’s for lunch. Ask me what’s for lunch instead. Say: "What’s healthy?"',
  CATEGORY_PROMPT: 'What type of lunch are you thinking of? We have options in: ',
  ADD_PROMPT: 'To add a lunch option, say something like "Add Chipotle in the Food Coma category"',
  STOP_MESSAGE: 'Bon apetit!',
  HELP_MESSAGE: 'You can say "What’s healthy?"',
  HELP_REPROMPT: 'Are you still hungry?',
  NO_CATEGORIES: 'Looks like I don’t know about any lunch options around you right now.'
};

const handlers = {
  'AskForRestaurant': function () {
    this.emit('GetRestaurant');
  },
  'AMAZON.HelpIntent': function () {
    this.emit(':ask', messages['HELP_MESSAGE'], messages['HELP_REMPROMPT']);
  },
  'AMAZON.CancelIntent': function () {
    this.emit(':tell', messages['STOP_MESSAGE']);
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell', messages['STOP_MESSAGE']);
  },
  'SessionEndedRequest': function () {
    this.emit(':tell', messages['STOP_MESSAGE']);
  },
  'AddRestaurant': function() {
    const category = this.event.request.intent.slots.category.value;
    if (!this.attributes[category]) {
      this.attributes[category] = {};
    }
    const restaurant = this.event.request.intent.slots.restaurant.value;
    if (this.attributes[category][restaurant]) {
      this.emit(':ask', `${restaurant} has already been added to the ${category} group`);
    } else {
      this.attributes[category][restaurant] = true;
      this.emit(':tell', `Thanks, I’ve added ${restaurant} to the ${category} group`);
    }
  },
  'GetRestaurant': function() {
    const category = this.attributes['categories'];
    if (this.attributes['categories']) {
      let restaurant = undefined;
      for (const key in category) {
        if (Math.random() < 1 / ++count) {
          restaurant = prop;
        }
      }

      this.emit(:tell)
    } else {
      this.emit(':ask', messages['NO_CATEGORIES'], messages['ADD_PROMPT']);
    }
  },
  'LaunchRequest': function () {
      this.emit(':ask', messages['LAUNCH_MESSAGE'], messages['HELP_MESSAGE']);
  }
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.dynamoDBTableName = 'WhatsForLunch';
    alexa.registerHandlers(handlers);
    alexa.execute();
};
