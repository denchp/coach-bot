const ws = new WebSocket('wss://coachdench-bot.herokuapp.com');

ws.addEventListener('open', function () {
  ws.send('something');
});

ws.addEventListener('message', function (data) {
  console.log(data);
});