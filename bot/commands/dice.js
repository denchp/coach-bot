const func = (client, channel, user, args, messageHandler) => {
    const sides = args[0] || 6;
    const result = Math.ceil(Math.random() * sides);
    client.say(channel, `${ user } rolled a ${ sides } sided die and got a ${ result }`);
}

func.description = 'role a n sided die ("!dice 4" for a 4-sided die)'

module.exports = func;