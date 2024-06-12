// script.js
document.addEventListener('DOMContentLoaded', (event) => {
    const button = document.getElementById('actionButton');
    const responseMessage = document.getElementById('responseMessage');

    button.addEventListener('click', () => {
        responseMessage.textContent = 'Button was clicked!';
        responseMessage.style.color = '#e74c3c';
    });
});
