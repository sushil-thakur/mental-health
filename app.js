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
}, 4000);  // Change text every 4 seconds to match the bubble animation
