const subEvents = require('../subEvents.js');

module.exports.testSub = (client, target, context, args, messageHandler) => {
    subEvents.newSubscriber("Test Subscription", messageHandler);
}