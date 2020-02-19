export const playAudio = async config => {
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
    setTimeout(() => source.start(0), config.delay || 0);
};