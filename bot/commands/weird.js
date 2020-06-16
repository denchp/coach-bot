let weirdCount = 0;

const func = (client, channel, user, args, messageHandler) => {
    if (args[0] == '++')
        ++weirdCount;

    client.say(channel, `Coach has said it will get weird ${ weirdCount } ${ (weirdCount==1) && 'time' || 'times' } today!`);
}

func.description = 'Number of times coach has said, "It\'s going to get weird" this stream (add " ++" to increment)';
func.count = () => (weirdCount);

module.exports = func;