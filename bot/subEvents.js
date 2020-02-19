exports.newSubscriber = (name, messageHandler) => {
    messageHandler({
        type: 'newSubscriber',
        audio: 'heshootshescores.mp3'
        userName: name
    });
};