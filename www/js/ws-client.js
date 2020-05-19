const ws = new WebSocket('wss://coachdench-bot.herokuapp.com');
import * as alerts from "./alerts.js";
import { playAudio, queueAudio } from "./audio.js";

ws.addEventListener('open', function () {
  ws.send('Initializing connection');

    const hb = () => { fetch('/hb'); setTimeout(hb, 600000) };
    hb();
});

ws.addEventListener('message', function (raw) {
    let data = raw.data;

    try {
        data = JSON.parse(raw.data);
    } catch {}

    if (typeof data === 'string') { data = { type: 'string', data }}

    switch(data.type) {
        case 'audio':
        case 'greeting':
            playAudio(data);
            break;
        case 'newSubscriber':
            alerts.subscriber(data);
            break;
        case 'queue-audio':
            queueAudio(data);
            break;
        case 'newFollow':
            alerts.follower(data);
            break;
        case 'message':
            
    }
});