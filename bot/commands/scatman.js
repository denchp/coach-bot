let scatmanUsers = [];
let scatmanTimeout = false;

const queueScatman = (client, target, context, args, messageHandler) => {
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
        setTimeout(() => (scatmanTimeout = false), 300000);
    }, 30000)
};

queueScatman.description = "All aboard the Scatman train!"
module.exports = queueScatman;