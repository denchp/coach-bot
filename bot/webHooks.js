const TwitchClient = require('twitch').default;
const WebHookListener = require('twitch-webhooks').default;

const { CLIENT_ID, OAUTH_TOKEN } = process.env;
let init = false;

const initHooks = async (messageHandler) => {
    if (init)
        return;
    
    init = true;

    const client = TwitchClient.withCredentials(CLIENT_ID, OAUTH_TOKEN);
    const user = await client.helix.users.getUserByName('CoachDench');

    const listener = await WebHookListener.create(client, {
        hostName: 'coachdench-bot.herokuapp.com',
        port: 8090,
        reverseProxy: {
            port: 443,
            pathPrefix: 'twitch-api'
        }
    });

    listener.listen();

    let followers = await listener.subscribeToFollowsToUser(user, async (event) => {
        console.log(JSON.stringify(event));
        typeof messageHandler === 'function' ? messageHandler({ type: 'newFollow', ...event }) : console.log(`No message handler for event`);
    });

    console.log(`Listening for followers...`);

    // Ducks was here (WhiteWithDucks 5/2/2020)
    let subs = await listener.subscribeToSubscriptionEvents(user, async (event) => {
        console.log(JSON.stringify(event));
        typeof messageHandler === 'function' ? messageHandler({ type: 'newSubscriber', ...event }) : console.log(`No message handler for event`);
    });
    
    //subs.start();
}

module.exports = initHooks;