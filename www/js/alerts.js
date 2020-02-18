exports.subscriber = data => {
    const video = document.getElementById("alert-video")
    video.src = '/video/subscriber_alert.webm';
    video.preload();
    video.play();
}