const WebSocket = require('ws');

const ws = new WebSocket('ws://coachdench-bot.herokuapp.com:8080');

ws.on('open', function open() {
  ws.send('something');
});

ws.on('message', function incoming(data) {
  console.log(data);
});