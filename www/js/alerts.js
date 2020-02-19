export const subscriber = data => {
    const video = document.getElementById("alert-video");

    video.classList.remove('hide');

    video.src = '/video/subscriber_alert.webm';
    video.play();

    video.onended = () => { video.classList.add('hide'); }
}