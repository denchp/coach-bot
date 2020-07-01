const ws = new WebSocket('wss://coachdench-bot.herokuapp.com');
import { updateWordList } from './wordList.js';

ws.addEventListener('open', function () {
  ws.send('Initializing connection');
});

ws.addEventListener('message', function (raw) {
    let data = raw.data;

    try {
        data = JSON.parse(raw.data);
    } catch {}

    if (typeof data === 'string') { data = { type: 'string', data }}

    switch(data.type) {
        case 'wordListUpdate':
            updateWordList(data);
            break;            
    }
});
