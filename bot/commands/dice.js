const func = (client, target, context, args) => {
    const sides = args[0] || 6;
    const result = Math.floor(Math.random() * sides) + 1;
    client.say(target, `You rolled a ${sides} sided die and got a ${result}`);
}

func.description = 'role a n sided die ("!dice 4" for a 4-sided die)'

module.exports = func;