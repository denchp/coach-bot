const subEvents = require('../subEvents.js');

exports['!testSub'] = (client, channel, user, args, messageHandler) => {
    if (user !== 'coachdench')
        return;

    subEvents.newSubscriber(args[0], messageHandler);
};