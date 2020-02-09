module.exports = config => (
    (client, target, context, args, messageHandler) => messageHandler({
        type: 'audio',
        file: config.file
    })
);