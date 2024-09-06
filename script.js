let breatheText = document.getElementById('breathe-text');
let isBreathingIn = true;

setInterval(() => {
    if (isBreathingIn) {
        breatheText.textContent = 'Breathe Out';
        isBreathingIn = false;
    } else {
        breatheText.textContent = 'Breathe In';
        isBreathingIn = true;
    }
}, 4000);
// JavaScript to handle mobile menu button toggle
document.getElementById('menu-btn').addEventListener('click', function() {
    document.querySelector('.navbar').classList.toggle('active');
});
