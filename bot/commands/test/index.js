const subEvents = require('../../subEvents.js');

export const testSub = (client, target, context, args, messageHandler) => {
    subEvents.newSubscriber("Test Subscription", messageHandler);
}