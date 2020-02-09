const ws = new WebSocket('wss://coachdench-bot.herokuapp.com:8080');

ws.onopen = function open() {
  ws.send('something');
};

ws.onmessage = function incoming(data) {
  console.log(data);
};