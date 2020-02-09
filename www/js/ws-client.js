const ws = new WebSocket('wss://coachdench-bot.herokuapp.com');

ws.addEventListener('open', function () {
  ws.send('something');
});

ws.addEventListener('message', function (raw) {
    let data = raw.data;

    try {
        data = JSON.parse(raw.data);
    } catch {}

    if (typeof data === 'string') { data = { type: 'string', data }}


    if(data.type === 'audio') {
        playAudio(data);
    }
});

const playAudio = async config => {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var context = new AudioContext();
    
    const resp = await fetch(`/audio/${config.file}`);
    const file = await resp.arrayBuffer();

    const audioBuffer = await context.decodeAudioData(file);

    const source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.start(0);
};