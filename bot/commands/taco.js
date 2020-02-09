module.exports = (client, target, context, args, messageHandler) => {
    messageHandler(JSON.stringify({
        type: 'audio',
        file: 'taco.mp3'
    }));
}