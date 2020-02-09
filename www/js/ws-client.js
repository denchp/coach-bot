const ws = new WebSocket('wss://coachdench-bot.herokuapp.com:8080');

ws.on('open', function open() {
  ws.send('something');
});

ws.on('message', function incoming(data) {
  console.log(data);
});