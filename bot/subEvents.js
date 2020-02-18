exports.newSubscriber = (name, messageHandler) => {
    messageHandler({
        type: 'newSubscriber',
        userName: name
    });
};