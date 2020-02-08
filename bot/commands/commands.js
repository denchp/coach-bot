const func = (client, target, context, args) => {
    const commandImport = require('.');

    const commands = Object.keys(commandImport).map(c => (`${c}: ${commandImport[c].description}`));
    commands.forEach(c => client.say(target, c));
}

func.description = "This command... this one right here... that you just... ran...";

module.exports = func;