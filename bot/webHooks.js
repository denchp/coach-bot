const TwitchClient = require('twitch').default;
const whl = require('twitch-webhooks').default;

const { CLIENT_ID, ACCESS_TOKEN } = process.env;

const initHooks = async () => {
    const client = TwitchClient.withClientCredentials(CLIENT_ID, ACCESS_TOKEN);
    const user = await client.helix.users.getUserByName('Pestily');

    const listener = await whl.create(client, { port: 8090 });
    listener.listen();

    let followers = await listener.subscribeToFollowsToUser(user, (event) => { console.log(JSON.stringify(event)); });
    followers.start();

    let subs = await listener.subscribeToSubscriptionEvents(user, (event) => { console.log(JSON.stringify(event)); });
    subs.start();
}

initHooks();