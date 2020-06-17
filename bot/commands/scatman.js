let scatmanUsers = [];
let scatmanTimeout = false;

const queueScatman = (client, target, userName, args, messageHandler) => {
    if (scatmanTimeout || scatmanUsers.some(u => u === userName)) {
        console.log(`No SCAT!: timeout: ${ scatmanTimeout } users: ${ scatmanUsers.join(', ') }`);
        return;
    }
    
    scatmanUsers.push(userName);

    const file = `scatman${scatmanUsers.length}.mp3`;
    
    messageHandler({
        type: 'queue-audio',
        file
    });

    setTimeout(() => {
        scatmanUsers = [];
        scatmanTimeout = true;
        setTimeout(() => (scatmanTimeout = false), 60000);
    }, 30000)
};

queueScatman.description = "All aboard the Scatman train!"
module.exports = queueScatman;