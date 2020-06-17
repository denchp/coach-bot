const coachBot = {
  onMessage: () => console.log(`Client not connected.`) //  SEMICOLON line 64!!!! (Alca via glEnd2) 5/2/2020
}

module.exports = coachBot;

(async () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Including .env`);
    require('dotenv').config();
  }

  const TwitchClient = require('twitch').default;
  const ChatClient = require('twitch-chat-client').default;

  const commands = require('./commands');
  const subEvents = require('./subEvents');
  const cheerEvents = require('./cheerEvents');

  const { CLIENT_ID, OAUTH_TOKEN, CLIENT_SECRET, REFRESH_TOKEN } = process.env;

  const eventLogger = (name, func) => {
    func ? func() : console.log(`No handler for: ${name}`);
  }

  const twitchClient = TwitchClient.withCredentials(CLIENT_ID, OAUTH_TOKEN, undefined, { clientSecret: CLIENT_SECRET, refreshToken: REFRESH_TOKEN });
  const client = await ChatClient.forTwitchClient(twitchClient, { channels: ['CoachDench'] });
  await client.connect();

  // Register our event handlers (defined below)
  client.onPrivmsg(onMessageHandler);
  client.onRegister(onConnectedHandler);

  // Connect to Twitch:
  client.connect();

  // Called every time a message comes in
  function onMessageHandler (channel, user, msg, privateMessage) {
    console.log(`Message received.`, user);

    console.log(privateMessage);
    if (privateMessage.isCheer) {
      cheerEvents.cheer(privateMessage.totalBits, privateMessage.userInfo, coachBot.onMessage);
    }

    // Remove whitespace from chat message
    const commandName = msg.trim();

    if (commandName[0] != '!' && commandName[0] != 'o')
      return;

    console.log(`Parsing message: ${msg}`);
    
    const commandArray = commandName.split(' ');
    const cmd = commands.getCommand(commandArray[0], user);

    if (cmd) {
        cmd(client, channel, user, commandArray.slice(1), coachBot.onMessage);
    } else {
        console.log(`${commandName}: is borked`);
    }
  }

  // Called every time the bot connects to Twitch chat
  function onConnectedHandler () {
      console.log(`* Connected to chat.`);
  }

  const handleSubEvent = (channel, user, subInfo, msg) => { subEvents.subscriber(user, subInfo, coachBot.onMessage) };
  const handleRaidEvent = (channel, user, raidInfo, msg) => { raidEvents.raided(user, raidInfo) };

  client.onSub(handleSubEvent);
  client.onSubGift(handleSubEvent);
  client.onSubExtend(handleSubEvent);
  client.onStandardPayForward(handleSubEvent);
  client.onResub(handleSubEvent);
  client.onPrimePaidUpgrade(handleSubEvent);
  client.onGiftPaidUpgrade(handleSubEvent);
  client.onCommunitySub(handleSubEvent);
  client.onCommunityPayForward(handleSubEvent);

  client.onRaid(handleRaidEvent);
  client.onHosted(handleRaidEvent);

  client.onBitsBadgeUpgrade(handleBitsEvent)

})();