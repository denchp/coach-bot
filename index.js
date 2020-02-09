const express = require('express');
const app = express();
const port = process.env.PORT || 5050;


app.use(express.static('www', { extensions: [ 'html' ] }));

const server = app.listen(port, () => console.log(`Overlay on ${port}!`));

const WebSocket = require('ws');

const wss = new WebSocket.Server({ server });

const bot = require('./bot');

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    bot.onMessage = message => {
        ws.send(message)
    };

    ws.send('Connected to coachbot WSS');
});