const TwitchClient = require('twitch').default;
const whl = require('twitch-webhooks').default;

const { CLIENT_ID, ACCESS_TOKEN } = process.env;

const initHooks = async () => {
    const client = TwitchClient.withClientCredentials(CLIENT_ID, ACCESS_TOKEN);
    const user = await client.helix.users.getUserByName('CoachDench');

    const listener = await whl.create(client, {port: 8090});
    listener.listen();

    let followers = await listener.subscribeToFollowsToUser(user, (follow) => { console.log(JSON.stringify(follow));});
}

initHooks();