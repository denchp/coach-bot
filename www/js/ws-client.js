const ws = new WebSocket('wss://coachdench-bot.herokuapp.com');
import alerts from 'alerts.js';

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
    }
});

const playAudio = async config => {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var context = new AudioContext();
    
    let resp = await fetch(`/audio/${config.file}`); // Try to get the specified file
    
    if (!resp.ok)
        resp = await fetch(`/audio/${config.fallback}`); // Try and get the fallback file

    if (!resp.ok)
        return; // Couldn't get either the primary or fallback, so there's nothing to play

    const file = await resp.arrayBuffer();

    const audioBuffer = await context.decodeAudioData(file);

    const source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.start(0);
};