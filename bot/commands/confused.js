let confusedCount = 0;
const func = (client, channel, user, args, messageHandler) => {
    if (args[0] == '++')
        ++confusedCount;

    client.say(channel, `Coach has been confused ${confusedCount} ${(confusedCount==1) && 'time' || 'times'} today!`);
}

func.description = 'Number of times coach has been confused this stream (add " ++" to increment)';

module.exports = func;