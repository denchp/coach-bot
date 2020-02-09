timeouts = {
    userName: { commandName: true }
};

module.exports = config => (
    (client, target, context, args, messageHandler) => { 
        if (timeouts[context.username] && timeouts[context.username][config.file])
            return;
        
        timeouts[context.username] = { ...context.username, [config.file]: true };

        setTimeout(() => delete timeouts[context.username][config.file], 10000);
        
        messageHandler({
            type: 'audio',
            file: config.file
        })
    }
);