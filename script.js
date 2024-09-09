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

// appointment
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle functionality
    const menuBtn = document.getElementById('menu-btn');
    const navbar = document.querySelector('.navbar');
    
    menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active'); // Show/hide the navbar when the menu button is clicked
    });

    // Form validation
    const appointmentForm = document.getElementById('appointment-form');
    
    appointmentForm.addEventListener('submit', (event) => {
        const name = document.getElementById('name').value.trim();
        const number = document.getElementById('number').value.trim();
        const email = document.getElementById('email').value.trim();
        const date = document.getElementById('date').value;

        if (!name || !number || !email || !date) {
            event.preventDefault(); // Prevent form submission if any field is empty
            alert('Please fill out all fields before submitting the form.');
            return;
        }

        if (!validateEmail(email)) {
            event.preventDefault();
            alert('Please enter a valid email address.');
            return;
        }

        alert('Appointment successfully submitted!');
    });

    // Function to validate email format
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});

//for blog
document.addEventListener('DOMContentLoaded', function() {
    const API_KEY = 'AIzaSyDP_bwfaLbv0Yct9U1SDoA8cgyimMGj__0'; // Replace with your actual API key
    const CHANNEL_ID = 'UCpuqYFKLkcEryEieomiAv3Q'; // Your YouTube channel ID
    const videoContainer = document.getElementById('video-container');
    const searchBtn = document.getElementById('search-btn');
    const searchQuery = document.getElementById('search-query');
    const voiceBtn = document.getElementById('voice-btn');

    // Web Speech API for Voice Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = function () {
        console.log('Voice recognition activated. Try speaking.');
    };

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        searchQuery.value = transcript;
        searchYouTubeVideos(transcript);
    };

    // Trigger voice recognition on mic click
    voiceBtn.addEventListener('click', () => {
        recognition.start();
    });

    // Load videos from the channel when the page loads
    fetchChannelVideos();

    // Fetch videos for the specific channel
    async function fetchChannelVideos() {
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=21`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayVideos(data.items);
        } catch (error) {
            console.error('Error fetching channel videos:', error);
        }
    }

    // Search YouTube videos based on the user's input
    async function searchYouTubeVideos(query) {
        const maxResults = 100;
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${encodeURIComponent(query)}&part=snippet&type=video&maxResults=${maxResults}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayVideos(data.items);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    }

    // Display videos
    function displayVideos(videos) {
        videoContainer.innerHTML = ''; // Clear previous results
        videos.forEach(video => {
            const videoBox = document.createElement('div');
            videoBox.classList.add('box');

            const videoThumbnail = video.snippet.thumbnails.high.url;
            const videoTitle = video.snippet.title;
            const videoDescription = video.snippet.description;
            const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;

            videoBox.innerHTML = `
                <div class="image">
                    <img src="${videoThumbnail}" alt="${videoTitle}">
                </div>
                <div class="content">
                    <a href="#"><i class="fas fa-calendar"></i> ${new Date(video.snippet.publishedAt).toLocaleDateString()}</a>
                    <a href="#"><i class="fas fa-user"></i> by ${video.snippet.channelTitle}</a>
                    <h3>${videoTitle}</h3>
                    <p>${videoDescription.slice(0, 100)}...</p>
                    <a href="${videoUrl}" class="btn" target="_blank">Watch Now <span class="fas fa-chevron-right"></span></a>
                </div>
            `;
            
            videoContainer.appendChild(videoBox);
        });
    }

    // Event listener for the search button
    searchBtn.addEventListener('click', () => {
        const query = searchQuery.value.trim();
        if (query) {
            searchYouTubeVideos(query);
        }
    });
});
