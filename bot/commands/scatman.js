const audioCmd = require('./audio');
const scatmanUsers = [];
const scatmanTimeout = false;

exports = (client, target, context, args, messageHandler) => {
    if (scatmanTimeout || scatmanUsers.some(u => u === context.username))
        return;
    
    scatmanUsers.push(context.username);

    const file = `scatman${scatmanUsers.length}.mp3`;
    
    messageHandler({
        type: 'queue-audio',
        file
    });

    setTimeout(() => {
        scatmanUsers = [];
        scatmanTimeout = true;
        setTimeout(() => (scatmanTimeout = false), 600000);
    }, 30000)
}