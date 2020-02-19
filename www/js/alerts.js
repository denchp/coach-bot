export const subscriber = data => {
    const video = document.getElementById("alert-video");
    const container = document.getElementById("alert-container");
    const label = document.getElementById("alert-label");

    container.classList.remove('hide');
    label.innerHTML = data.name;
    
    video.src = '/video/subscriber_alert.webm';
    
    setTimeout(() => video.play(), 500);

    video.addEventListener('ended' ,() => container.classList.add('hide'));
}