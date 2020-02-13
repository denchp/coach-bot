const timeouts = {
    userName: true 
};

module.exports = name => (
    (client, target, context, args, messageHandler) => {
        if(timeouts[name])
            return;

        if (timeouts[name]) {
            client.whisper(name, `Sorry, that command is on cool down...`);
            return;
        }            
        
        timeouts[name] = true;
        setTimeout(() => timeouts[name] = undefined, 300000);

        messageHandler({
            type: 'greeting',
            file: name + '.mp3',
            fallback: 'hi' + Math.ceil(Math.random() * 5) + '.mp3'
        });
    }
);