module.exports = (client, target, context, args, messageHandler) => {
    messageHandler({
        type: 'audio',
        file: 'taco.mp3'
    });
}