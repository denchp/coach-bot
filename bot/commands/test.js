const subEvents = require('../subEvents.js');

exports['!testSub'] = (client, target, context, args, messageHandler) => {
    if (!context.badges || !context.badges.broadcaster)
        return;

    subEvents.newSubscriber("Brokensc", messageHandler);
};