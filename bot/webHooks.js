const TwitchClient = require('twitch').default;
const whl = require('twitch-webhooks').default;

const { CLIENT_ID, ACCESS_TOKEN } = process.env;

const initHooks = async () => {
    const client = TwitchClient.withCredentials(CLIENT_ID, ACCESS_TOKEN);
    const user = await client.helix.users.getUserByName('GLend2');

    const listener = await whl.create(client, {
        hostName: 'coachdench-bot.herokuapp.com',
        port: 8090,
    });

    listener.listen();

    let followers = await listener.subscribeToFollowsToUser(user, async (event) => { console.log(JSON.stringify(event)); });

    console.log(`Listening for followers...`);

    // let subs = await listener.subscribeToSubscriptionEvents(user, (event) => { console.log(JSON.stringify(event)); });
    // subs.start();
}

initHooks();