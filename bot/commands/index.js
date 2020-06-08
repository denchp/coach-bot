const audioCmd = require('./audio');
const greetingCmd = require('./greetings');
const text = require('./text');

let test = require('./test');

module.exports = {
    getCommand: (cmd, user)  => {
        if (legacy[cmd] !== undefined)
            return legacy[cmd];
        
        if (audio[cmd] !== undefined)
            return audioCmd(audio[cmd]);
        
        if (test[cmd] !== undefined)
            return test[cmd];
        
        if (text[cmd] !== undefined)
            return text[cmd];

        if (['!hi', '!hello', 'o/' ].some(s => s === cmd))
            return greetingCmd(user);
    }
}

const legacy = {
    '!dice': require('./dice.js'),
    '!weird': require('./weird.js'),
    '!confused': require('./confused.js'),
    '!commands': require('./commands.js'),
    '!hangman': require('./hangman.js'),
    '!eggsembly': require('./eggsembly.js'),
    '!scatman': require('./scatman.js')
}

const audio = { 
    '!taco': { file: 'taco.mp3' },
    '!copyright': { file: 'copyright.mp3' },
    '!meat': { file: 'meat.mp3' },
    '!pokemon': { file: 'pokemon.mp3' },
    '!circleoflife': { file: 'circleoflife.mp3' },
    '!menu': { file: 'whatsonthemenu.mp3' },
    '!bragging': { file: 'braggingcamp.mp3' },
    '!pizza': { file: 'pizzasong.mp3', globalTimeout: 600000},
    '!tunak': { file: 'tunak.mp3', globalTimeout: 6000000 },
    '!help': { file: 'help.mp3', globalTimeout: 6000000, message: "[!help] Custom command from glEnd2" },
    '!cow': { file: 'cow.mp3', globalTimeout: 6000000, message: "[!help] Custom command from glEnd2" },
    '!rip': { file: 'rip_meme.mp3', globalTimeout: 300000 },
    '!evolution': { file: 'salty.mp3', globalTimeout: 300000 },
    '!oops': { file: 'oops.mp3', globalTimeout: 30000 }
}