const tmi = require('tmi.js');
const commands = require('./commands');
const subEvents = require('./subEvents');

const { BOT_USERNAME, OAUTH_TOKEN, CHANNEL_NAME } = require('../env');

// Define configuration options
const opts = {
  identity: {
    username: BOT_USERNAME,
    password: OAUTH_TOKEN
  },
  channels: [
    CHANNEL_NAME
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot
  console.log(`Parsing message: ${msg}`);

  // Remove whitespace from chat message
  const commandName = msg.trim();

  if (commandName[0] != '!' && commandName[0] != 'o')
    return;

    const commandArray = commandName.split(' ');
    const cmd = commands.getCommand(commandArray[0], context.username);

    if (cmd) {
        cmd(client, target, context, commandArray.slice(1), coachBot.onMessage);
    } else {
        console.log(`${commandName}: is borked`);
    }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

const coachBot = {
  
}

client.on("anongiftpaidupgrade", () => {});
client.on("giftpaidupgrade", subEvents.newSubscriber);
client.on("resub", subEvents.newSubscriber);
client.on("subgift", subEvents.newSubscriber);
client.on("submysterygift", subEvents.newSubscriber);
client.on("anonsubgift", subEvents.newSubscriber);
client.on("anonsubmysterygift", subEvents.newSubscriber);
client.on("primepaidupgrade", subEvents.newSubscriber);
client.on("subscription", (channel, username, method, message, userstate) => { subEvents.newSubscriber(userName, coachBot.onMessage) });


module.exports = coachBot;