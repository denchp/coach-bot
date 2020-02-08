let word = '',
    misses = 0,
    guesses = [],
    checkWord = require('check-word'),
    words     = checkWord('en'); // setup the language for check, default is en
    
let currentTimeout;

const func = (client, target, context, args) => {
    const resetGame = msg => {
        client.say(target, `The game has been reset.`);
        clearTimeout(currentTimeout);
        currentTimeout = null;
        word = '';
        misses = 0;
    }

    if (context["message-type"] == 'whisper' && args[0] == 'set') {
        currentTimeout = setTimeout(() => {
            if (!currentTimeout) return;
            
            client.say(target, `Thanks ${gameOwner}, your word was too hard.. For the rest of us it was "${word}"`);
            resetGame();
        }, 5 * 60000);
            
        if(word.length) {
            client.whisper(target, `Sorry, there's already a game of Hangman going on!`)
                .then(() => console.log(`Whisper resolved`))
                .catch(err => console.log(err, 'Error whispering'));    
            return;
        }
        
        if (!words.check(args[1])) {
            client.whisper(target, `Sorry ${args[1]} is not a valid word; please try again.`);
            return;
        }

        word = args[1] || "ThanksglEnd2";
        gameOwner = target.slice(1);

        client.whisper(target, `Got it, the word is ${word}`);
        misses = 0;
        guesses = [];
        client.getChannels().forEach(channel => client.say(channel, "Hangman game has begun!"));
        return;
    }

    if (word.length === 0) {
        client.say(target, 'There\'s no game of hangman right now!');
        return;
    }

    if (!args[0])
    {
        client.say(target, `Current guesses: ${guesses.join (', ')}`);
        client.say(target, `Current misses: ${misses}`)
        client.say(target, `Current word state: ${ [].map.call(word, l => guesses.includes(l) ? l : '_ ' ).join('') }`)
        
        return;
    }
    
    const guess = args[0];

    if (guesses.includes(guess.toLowerCase())) {
        client.say(target, 'That has already been guessed.')
        return;
    }

    if (guess.length > 1) {
        if (guess == word)
            client.say(target, 'STOP IT ALCA, ONLY USE ONE LETTER!')
        return;
    }

    guesses.push(guess.toLowerCase());

    if (word.indexOf(guess) === -1) {
        misses++;
        client.say(target, `No, there is no ${guess}!!!`);

        if (misses === 7) {
            client.say(target, `Oh no, he dead!  The word was, "${word}"`);
            setTimeout(resetGame, 5000);
        }

        return;
    }

    client.say(target, `Correct!`);
    client.say(target, `Current word state: ${ [].map.call(word, l => guesses.includes(l.toLowerCase()) ? l : '_ ' ).join('') }`)

    if ([].map.call(word, l => guesses.includes(l) ? l : '_ ' ).join('') == word) {
        client.getChannels().forEach(c => client.say(c, `${context.username} won hangman! The word was "${word}"`))
        resetGame();
    }
}

func.description = 'Play hangman! "!hangman [LETTER]" to guess or whisper CoachBot "!hangman set [WORD]"';

func.status = () => {
    return { misses, guesses }
}

module.exports = func;