import { playAudio } from './audio.js';

const container = document.getElementById("follow-container");
const crack = document.getElementById("crack");

export const subscriber = async data => {
    const video = document.getElementById("alert-video");
    const container = document.getElementById("alert-container");
    const labels = [ ...document.getElementsByClassName("alert-label")];
    container.classList.remove('hide');
    labels.forEach(e => e.setAttribute('title', data.userName));

    video.src = '/video/subscriber_alert.webm';
    playAudio({
        file: data.audio,
        delay: 0
    })

    setTimeout(() => {
        video.play();
    }, 500);

    video.addEventListener('ended' ,() => container.classList.add('hide'));
}

export const follower = async data => {
    console.log(`New follower! ${ JSON.stringify(data)}`);

    playAudio({
        file: 'slapshot.mp3',
        delay: 0
    });

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let text = ctx.measureText(data._data.from_name);

    const labels = [ ...document.getElementsByClassName("follow-label")];
    labels.forEach(e => {
        e.setAttribute('title', data._data.from_name)
        e.style.fontSize = 600 * 5 / text.width + 'px';
    });

    container.classList.add('animate');
}

puck.addEventListener('animationend', ()=> {
    puck.classList.remove('animate');
    
    playAudio({
        file: 'shatter.mp3',
        delay: 0
    });

    crack.classList.add('visible');

    setTimeout(() => {
        crack.classList.remove('visible');
        container.classList.remove('animate'); 
    }, 3000);
});