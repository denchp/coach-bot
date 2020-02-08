let eggCount = 0;
const func = (client, target, context, args) => {
    if (args[0] == '++')
        ++eggCount;

    client.say(target, `Satan0 has brought up eggsembly ${eggCount} ${(eggCount==1) && 'time' || 'times'} today!`);
}

func.description = 'Number of times Satan0 has brought up eggsembly (add " ++" to increment)';

module.exports = func;