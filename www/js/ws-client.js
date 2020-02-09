const ws = new WebSocket('wss://coachdench-bot.herokuapp.com:8080');

ws.addEventListener('open', function open() {
  ws.send('something');
});

ws.addEventListener('message', function incoming(data) {
  console.log(data);
});