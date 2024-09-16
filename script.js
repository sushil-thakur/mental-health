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
        navbar.classList.toggle('active'); 
    });

    // Form validation
    const appointmentForm = document.getElementById('appointment-form');
    
    appointmentForm.addEventListener('submit', (event) => {
        const name = document.getElementById('name').value.trim();
        const number = document.getElementById('number').value.trim();
        const email = document.getElementById('email').value.trim();
        const date = document.getElementById('date').value;

        if (!name || !number || !email || !date) {
            event.preventDefault(); 
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
    const API_KEY = 'AIzaSyDP_bwfaLbv0Yct9U1SDoA8cgyimMGj__0'; 
    const CHANNEL_ID = 'UCpuqYFKLkcEryEieomiAv3Q'; 
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
        videoContainer.innerHTML = ''; 
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
document.addEventListener('DOMContentLoaded', () => {
    // Select the elements
    const chatIcon = document.getElementById('chat-icon');
    const chatbox = document.getElementById('chatbox');
    const closeChatbox = document.getElementById('close-chatbox');
    const doctorChats = document.querySelectorAll('.doctor-chat');
    const chatInterface = document.getElementById('chat-interface');
    const doctorList = document.getElementById('doctor-list');
    const chatMessages = document.getElementById('chat-messages');
    const doctorNameElement = document.getElementById('chat-doctor-name');
    const doctorPhotoElement = document.getElementById('doctor-photo');
    const messageInput = document.getElementById('chat-message-input');
    const sendMessageBtn = document.getElementById('send-message-btn');

    // Debugging: Check if elements are correctly selected
    console.log('chatIcon:', chatIcon);
    console.log('chatbox:', chatbox);
    console.log('closeChatbox:', closeChatbox);
    console.log('doctorChats:', doctorChats);
    console.log('chatInterface:', chatInterface);
    console.log('doctorList:', doctorList);
    console.log('chatMessages:', chatMessages);
    console.log('doctorNameElement:', doctorNameElement);
    console.log('doctorPhotoElement:', doctorPhotoElement);
    console.log('messageInput:', messageInput);
    console.log('sendMessageBtn:', sendMessageBtn);

    // Toggle chatbox visibility when chat icon is clicked
    if (chatIcon) {
        chatIcon.addEventListener('click', () => {
            if (chatbox) {
                chatbox.style.display = 'block';
                if (doctorList) doctorList.style.display = 'block';
                if (chatInterface) chatInterface.style.display = 'none';
            }
            console.log('Chatbox opened');
        });
    } else {
        console.error('Chat icon not found');
    }

    if (closeChatbox) {
        closeChatbox.addEventListener('click', () => {
            if (chatbox) chatbox.style.display = 'none';
            console.log('Chatbox closed');
        });
    } else {
        console.error('Close chatbox button not found');
    }

    // Open chat for selected doctor
    if (doctorChats.length) {
        doctorChats.forEach(doctor => {
            doctor.addEventListener('click', () => {
                const doctorName = doctor.getAttribute('data-doctor');
                const doctorPhoto = doctor.getAttribute('data-photo');

                if (doctorNameElement) {
                    doctorNameElement.textContent = doctorName;
                } else {
                    console.error('Doctor name element not found');
                }

                if (doctorPhotoElement) {
                    doctorPhotoElement.src = doctorPhoto;
                } else {
                    console.error('Doctor photo element not found');
                }

                // Hide doctor list and show chat interface
                if (doctorList) doctorList.style.display = 'none';
                if (chatInterface) chatInterface.style.display = 'flex';

                // Clear previous messages
                if (chatMessages) chatMessages.innerHTML = '';
                console.log('Chat with', doctorName, 'opened');
            });
        });
    } else {
        console.error('No doctor chat elements found');
    }

    // Send message function
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', () => {
            const messageText = messageInput.value;
            if (messageText.trim() !== '') {
                const messageElement = document.createElement('div');
                messageElement.classList.add('chat-message');
                messageElement.textContent = messageText;
                if (chatMessages) chatMessages.appendChild(messageElement);

                // Clear input
                if (messageInput) messageInput.value = '';

                // Scroll to the latest message
                if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
                console.log('Message sent:', messageText);
            }
        });
    } else {
        console.error('Send message button not found');
    }
});
