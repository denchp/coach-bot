const subEvents = require('../subEvents.js');

exports['!testSub'] = (client, channel, user, args, messageHandler) => {
    if (!context.badges || !context.badges.broadcaster)
        return;

    subEvents.newSubscriber(args[0], messageHandler);
};