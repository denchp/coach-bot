const subEvents = require('../subEvents.js');

exports['!testSub'] = (client, channel, user, args, messageHandler) => {
    if (user !== 'coachdench')
        return;

    subEvents.subscriber(args[0], messageHandler);
};