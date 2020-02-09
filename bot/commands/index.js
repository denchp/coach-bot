const audioCmd = require('./audio');

module.exports = {
    getCommand: name => {
        if (legacy[name] !== undefined)
            return legacy[name];
        
        if (audio[name] !== undefined)
            return(audioCmd(audio[name]));
    }
}

const legacy = {
    '!dice': require('./dice.js'),
    '!weird': require('./weird.js'),
    '!confused': require('./confused.js'),
    '!commands': require('./commands.js'),
    '!hangman': require('./hangman.js'),
    '!eggsembly': require('./eggsembly.js'),
}

const audio = { 
    '!taco': { file: 'taco.mp3' },
    '!copyright': { file: 'copyright.mp3' },
    '!meat': { file: 'meat.mp3' },
    '!pokemon': { file: 'pokemon.mp3' }
}