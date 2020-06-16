let eggCount = 0;
const func = (client, channel, user, args, messageHandler) => {
    if (args[0] == '++')
        ++eggCount;

    client.say(channel, `Satan0 has brought up eggsembly ${ eggCount } ${ (eggCount==1) && 'time' || 'times' } today!`);
}

func.description = 'Number of times Satan0 has brought up eggsembly (add " ++" to increment)';

module.exports = func;