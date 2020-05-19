const timeouts = {
    username: { commandName: true }
};

module.exports = config => (
    (client, target, context, args, messageHandler) => {
        if(timeouts[context.username] && timeouts[context.username].audio || timeouts[config.file]) {
            console.log(`Not executing command:
                ${ timeouts[context.username] && timeouts[context.username].audio ? context.username + " is on cool down" :
                config.file + " is on cool down"
             }`);
            return;
        }

        if (timeouts[context.username] && timeouts[context.username][config.file]) {
            console.log(`Cool down hit`);
            client.whisper(context.username, `Sorry, that command is on cool down...`);
            return;
        }            
        
        timeouts[context.username] = {
            ...timeouts[context.username], 
            [config.file]: true,
            audio: true
        };

        if(config.globalTimeout)
            timeouts[config.file] = true;


        setTimeout(() => { console.log(context.username, ' off timeout'); timeouts[context.username].audio = undefined }, 5000);
        setTimeout(() => timeouts[context.username][config.file] = undefined, config.timeout || 30000);
        setTimeout(() => timeouts[config.file] = undefined, config.globalTimeout || 30000);

        messageHandler && messageHandler({
            type: 'audio',
            file: config.file
        });
    }
);