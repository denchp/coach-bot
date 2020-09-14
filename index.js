const express = require('express');
var proxy = require('express-http-proxy');
const webHooks = require('./bot/webHooks');

const app = express();
const port = process.env.PORT || 5050;


app.use(express.static('www', { extensions: [ 'html' ] }));

app.use('/twitch-api', proxy('localhost:8090'));

const server = app.listen(port, () => console.log(`Overlay on ${port}!`));

const WebSocket = require('ws');

const wss = new WebSocket.Server({ server });

const bot = require('./bot');

wss.on('connection', function connection(ws) {
    const keepAlive = () => { ws.send(JSON.stringify({ type: 'keep-alive' }), setTimeout(keepAlive, 30000)) };

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    bot.onMessage = message => {
		console.log(`Sending `, JSON.stringify(message));
        ws.send(JSON.stringify(message));
    };

    webHooks(bot.onMessage);
    keepAlive();

    ws.send('Connected to CoachBot WSS');
});