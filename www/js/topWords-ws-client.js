const ws = new WebSocket('wss://coachdench-bot.herokuapp.com');

ws.addEventListener('open', function () {
  ws.send('Initializing connection');
});

export default ws;