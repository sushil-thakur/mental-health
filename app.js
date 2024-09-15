// You can use this file to implement any interactivity needed.
// For now, it's left blank as the focus is mainly on the design and structure.

document.querySelector('#menu-btn').addEventListener('click', () => {
    document.querySelector('.navbar').classList.toggle('active');
});
document.addEventListener('DOMContentLoaded', function() {
    const aboutVideo = document.getElementById('aboutVideo');

    // Autoplay the video when the page loads
    aboutVideo.play().then(() => {
        // Play the video with sound after a brief delay (browser policies often block autoplay with sound)
        setTimeout(() => {
            aboutVideo.muted = false;
        }, 1000); // Unmute after 1 second
    }).catch(error => {
        console.log("Autoplay was prevented:", error);
    });
});
