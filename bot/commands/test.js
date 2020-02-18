const subEvents = require('../subEvents.js');

exports.testSub = (client, target, context, args, messageHandler) => {
    subEvents.newSubscriber("Test Subscriber", messageHandler);
};