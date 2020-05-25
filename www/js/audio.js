import { showMessage } from './overlay.js';

export const playAudio = async (config, onEnded) => {
    config.message && showMessage(config.message);

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
    onEnded && source.addEventListener('ended', onEnded);

    source.connect(context.destination);
    setTimeout(() => source.start(0), config.delay || 0);
};

const queue = [];
export const queueAudio = async config => {
    queue.push(config);
    queueProcessor.process();
}

const queueProcessor = {
    process: function() {
        if (this.processing)
            return;
        
        this.processing = true;

        const playNext = () => queue.length ? playAudio(queue.shift(), playNext) : this.processing = false;
        playNext();
    }
}
