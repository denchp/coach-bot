exports.cheer = (bitCount, userInfo, messageHandler) => {
    console.log(`BITS!`, bitCount, userInfo);

    let audio = 'chaching.mp3';

    if(bitCount === 1) {
        audio = 'OohAPenny.mp3';
    } else if (bitCount < 50) {
        audio = 'chaching.mp3';
    } else {
        audio = 'pennies_on_table.mp3';
    }

    messageHandler({
        type: 'cheer',
        audio,
        userName: userInfo.displayName
    });
};