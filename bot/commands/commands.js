const func = (client, channel, user, args, messageHandler) => {
    const commandImport = require('.');

    const commands = Object.keys(commandImport).map(c => (`${c}: ${commandImport[c].description}`));
    commands.forEach(c => client.say(channel, c));
}

func.description = "This command... this one right here... that you just... ran...";

module.exports = func;