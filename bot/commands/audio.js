const timeouts = {
    userName: { commandName: true }
};

module.exports = config => (
    (client, target, context, args, messageHandler) => {
        if(timeouts[context.userName] && timeouts[context.userName].audio || timeouts[config.file]) {
            console.log(`Not executing command:
                ${ timeouts[context.userName] && timeouts[context.userName].audio ? context.userName + " is on cool down" :
                config.file + " is on cool down"
             }`);
            return;
        }

        if (timeouts[context.userName] && timeouts[context.userName][config.file]) {
            console.log(`Cool down hit`);
            client.whisper(context.userName, `Sorry, that command is on cool down...`);
            return;
        }            
        
        timeouts[context.userName] = {
            ...timeouts[context.userName], 
            [config.file]: true,
            audio: true
        };

        if(config.globalTimeout)
            timeouts[config.file] = true;


        setTimeout(() => { console.log(context.userName, ' off timeout'); timeouts[context.userName].audio = undefined }, 5000);
        setTimeout(() => timeouts[context.userName][config.file] = undefined, config.timeout || 30000);
        setTimeout(() => timeouts[config.file] = undefined, config.globalTimeout || 30000);

        messageHandler && messageHandler({
            type: 'audio',
            file: config.file
        });
    }
);