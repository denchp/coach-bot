const timeouts = {
    username: { commandName: true }
};

module.exports = config => (
    (client, channel, user, args, messageHandler) => {
        if(timeouts[user] && timeouts[user].audio || timeouts[config.file]) {
            console.log(`Not executing command:
                ${ timeouts[user] && timeouts[user].audio ? user + " is on cool down" :
                config.file + " is on cool down"
             }`);
            return;
        }

        if (timeouts[user] && timeouts[user][config.file]) {
            console.log(`Cool down hit`);
            client.whisper(user, `Sorry, that command is on cool down...`);
            return;
        }            
        
        timeouts[user] = {
            ...timeouts[user], 
            [config.file]: true,
            audio: true
        };

        if(config.globalTimeout)
            timeouts[config.file] = true;


        setTimeout(() => { console.log(user, ' off timeout'); timeouts[user].audio = undefined }, 5000);
        setTimeout(() => timeouts[user][config.file] = undefined, config.timeout || 30000);
        setTimeout(() => timeouts[config.file] = undefined, config.globalTimeout || 30000);

        messageHandler && messageHandler({
            type: 'audio',
            file: config.file
        });
    }
);