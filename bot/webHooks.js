const TwitchClient = require('twitch').default;
const whl = require('twitch-webhooks').default;

const { CLIENT_ID, ACCESS_TOKEN } = process.env;

const initHooks = async (messageHandler) => {
    const client = TwitchClient.withCredentials(CLIENT_ID, ACCESS_TOKEN);
    const user = await client.helix.users.getUserByName('RaycatWhoDat');

    const listener = await whl.create(client, {
        hostName: 'coachdench-bot.herokuapp.com',
        port: 8090,
        reverseProxy: {
            port: 80,
            pathPrefix: 'twitch-api'
        }
    });

    listener.listen();

    let followers = await listener.subscribeToFollowsToUser(user, async (event) => {
        console.log(JSON.stringify(event));
        typeof messageHandler === 'function' ? messageHandler({ type: 'newFollow', ...event) : console.log(`No message handler for event`);
    });

    console.log(`Listening for followers...`);

    // let subs = await listener.subscribeToSubscriptionEvents(user, (event) => { console.log(JSON.stringify(event)); });
    // subs.start();
}

module.exports = initHooks;