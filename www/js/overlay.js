export const showMessage = (message) => {
    const msgBox = document.getElementById('message-box');
    msgBox.innerHTML = message;
    
    msgBox.classList.add('animate');
    msgBox.addEventListener('animationend', () => msgBox.classList.remove('animate'));

}