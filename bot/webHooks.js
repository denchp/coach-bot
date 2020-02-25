const TwitchClient = require('twitch').default;
const whl = require('twitch-webhooks').default;

const { CLIENT_ID, ACCESS_TOKEN } = require('../env');

const initHooks = async () => {
    const client = TwitchClient.withCredentials(CLIENT_ID, ACCESS_TOKEN);
    const listener = await whl.create(client, {port: 8090});
    
    listener.listen();
}

initHooks();