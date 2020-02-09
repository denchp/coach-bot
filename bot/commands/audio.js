const timeouts = {
    userName: { commandName: true }
};

module.exports = config => (
    (client, target, context, args, messageHandler) => { 
        if (timeouts[context.username] && timeouts[context.username][config.file]) {
            client.whisper(context.username, `Sorry, that command is on cool down...`);
        }
            
        
        timeouts[context.username] = { ...context.username, [config.file]: true };

        setTimeout(() => timeouts[context.username][config.file] = undefined, 30000);

        messageHandler({
            type: 'audio',
            file: config.file
        })
    }
);