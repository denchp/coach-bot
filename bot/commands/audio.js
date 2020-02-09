module.exports = (config) => (
    messageHandler => messageHandler({
        type: 'audio',
        file: config.file
    })
);