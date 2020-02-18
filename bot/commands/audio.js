const timeouts = {
    userName: { commandName: true }
};

module.exports = config => (
    (client, target, context, args, messageHandler) => {
        if(timeouts[context.username] && timeouts[context.username].audio)
            return;

        if (timeouts[context.username] && timeouts[context.username][config.file]) {
            client.whisper(context.username, `Sorry, that command is on cool down...`);
            return;
        }            
        
        timeouts[context.username] = {
            ...timeouts[context.username], 
            [config.file]: true,
            audio: true
            
        };

        setTimeout(() => timeouts[context.username].audio = undefined, 5000);
        setTimeout(() => timeouts[context.username][config.file] = undefined, 60000);

        messageHandle && messageHandler({
            type: 'audio',
            file: config.file
        });
    }
);