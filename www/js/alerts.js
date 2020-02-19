export const subscriber = data => {
    const video = document.getElementById("alert-video");

    video.classList.remove('hide');

    video.src = '/video/subscriber_alert.webm';
    video.play();

    video.addEventListener('ended' ,() => video.classList.add('hide'));
}