document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const numberDisplay = document.getElementById('number-display');
    const timerDisplay = document.getElementById('timer-display');
    const inputSection = document.getElementById('input-section');
    const numberInput = document.getElementById('number-input');
    const submitBtn = document.getElementById('submit-btn');
    const startBtn = document.getElementById('start-btn');
    const feedback = document.getElementById('feedback');
    const levelDisplay = document.getElementById('level');
    const scoreDisplay = document.getElementById('score');
    const highScoreDisplay = document.getElementById('high-score');
    const levelProgress = document.getElementById('level-progress');
    
    // Settings and modals
    const settingsBtn = document.getElementById('settings-btn');
    const helpBtn = document.getElementById('help-btn');
    const soundBtn = document.getElementById('sound-btn');
    const settingsPanel = document.getElementById('settings-panel');
    const helpPanel = document.getElementById('help-panel');
    const closeSettings = document.getElementById('close-settings');
    const closeHelp = document.getElementById('close-help');
    const difficultySelect = document.getElementById('difficulty');
    const themeSelect = document.getElementById('theme');
    const volumeControl = document.getElementById('volume-control');
    const volumeValue = document.getElementById('volume-value');

    // Game state variables
    let currentNumber = '';
    let level = 1;
    let score = 0;
    let highScore = localStorage.getItem('highScore') || 0;
    let timer;
    let soundEnabled = true;
    let difficulty = 'medium';
    let currentTheme = 'blue';
    
    // Sound effects
    const sounds = {
        correct: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3'),
        incorrect: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3'),
        levelUp: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3'),
        countdown: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-tick-tock-timer-1045.mp3'),
        gameStart: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-complete-or-approved-mission-205.mp3')
    };
    
    // Volume control
    let volumeLevel = 1.0; // Default volume level (100%)
    
    // Initialize high score display
    highScoreDisplay.textContent = highScore;

    function generateNumber(level) {
        // Adjust number length based on difficulty
        let length;
        switch(difficulty) {
            case 'easy':
                length = level + 1;
                break;
            case 'medium':
                length = level + 2;
                break;
            case 'hard':
                length = level + 3;
                break;
            default:
                length = level + 1;
        }
        
        let number = '';
        for (let i = 0; i < length; i++) {
            number += Math.floor(Math.random() * 10);
        }
        return number;
    }

    function showNumber() {
        // Play game start sound
        playSound('gameStart');
        
        currentNumber = generateNumber(level);
        numberDisplay.textContent = currentNumber;
        numberDisplay.classList.remove('hidden');
        numberDisplay.classList.add('visible');
        
        // Set display time based on difficulty
        let displayTime;
        switch(difficulty) {
            case 'easy':
                displayTime = 5;
                break;
            case 'medium':
                displayTime = 3;
                break;
            case 'hard':
                displayTime = 2;
                break;
            default:
                displayTime = 3;
        }
        
        let timeLeft = displayTime;
        timerDisplay.textContent = timeLeft;
        timerDisplay.classList.remove('urgent');

        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            
            // Play countdown sound
            playSound('countdown');
            
            // Add urgent class when time is running out
            if (timeLeft <= 1) {
                timerDisplay.classList.add('urgent');
            }
            
            if (timeLeft === 0) {
                clearInterval(timer);
                hideNumber();
            }
        }, 1000);
    }

    function hideNumber() {
        numberDisplay.classList.remove('visible');
        numberDisplay.classList.add('hidden');
        timerDisplay.textContent = '';
        timerDisplay.classList.remove('urgent');
        inputSection.classList.remove('hidden');
        inputSection.classList.add('visible');
        numberInput.focus();
        
        // Add animation to input section
        inputSection.style.animation = 'none';
        setTimeout(() => {
            inputSection.style.animation = 'slideIn 0.5s ease-out';
        }, 10);
    }

    function checkAnswer() {
        const userAnswer = numberInput.value;
        if (!userAnswer) return; // Don't proceed if input is empty
        
        feedback.classList.remove('hidden');
        feedback.classList.add('visible');

        if (userAnswer === currentNumber) {
            // Correct answer
            playSound('correct');
            feedback.innerHTML = '<i class="fas fa-check-circle"></i> Correct!';
            feedback.className = 'correct visible';
            score += level * 10;
            level++;
            
            // Play level up sound if advancing to a new level
            if (level % 3 === 0) {
                playSound('levelUp');
            }
            
            // Update high score if needed
            if (score > highScore) {
                highScore = score;
                highScoreDisplay.textContent = highScore;
                localStorage.setItem('highScore', highScore);
                
                // Animate high score
                highScoreDisplay.parentElement.style.animation = 'pulse 0.5s';
                setTimeout(() => {
                    highScoreDisplay.parentElement.style.animation = '';
                }, 500);
            }
        } else {
            // Incorrect answer
            playSound('incorrect');
            feedback.innerHTML = `<i class="fas fa-times-circle"></i> Wrong! The number was ${currentNumber}`;
            feedback.className = 'incorrect visible';
            level = Math.max(1, level - 1);
        }

        // Update displays
        scoreDisplay.textContent = score;
        levelDisplay.textContent = level;
        numberInput.value = '';
        
        // Update progress bar
        updateProgressBar();

        setTimeout(() => {
            feedback.classList.remove('visible');
            feedback.classList.add('hidden');
            inputSection.classList.remove('visible');
            inputSection.classList.add('hidden');
            startBtn.style.display = 'block';
        }, 2000);
    }

    // Helper function to play sounds
    function playSound(soundName) {
        if (soundEnabled && sounds[soundName]) {
            sounds[soundName].volume = volumeLevel;
            sounds[soundName].currentTime = 0;
            sounds[soundName].play().catch(e => console.log('Error playing sound:', e));
        }
    }
    
    // Update progress bar based on level
    function updateProgressBar() {
        const progressPercentage = ((level - 1) % 5) * 20;
        levelProgress.style.width = `${progressPercentage}%`;
    }
    
    // Apply theme changes
    function applyTheme(theme) {
        const root = document.documentElement;
        switch(theme) {
            case 'dark':
                document.body.style.background = 'linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #1a1a2e)';
                break;
            case 'light':
                document.body.style.background = 'linear-gradient(-45deg, #ff9a8b, #ff6a88, #ff99ac, #fcb69f)';
                break;
            case 'blue':
            default:
                document.body.style.background = 'linear-gradient(-45deg, #4facfe, #00f2fe, #0099ff, #6a11cb)';
                break;
        }
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = 'gradient 15s ease infinite';
        currentTheme = theme;
    }
    
    // Toggle modals
    function toggleModal(modal) {
        if (modal.classList.contains('hidden')) {
            modal.classList.remove('hidden');
            modal.classList.add('visible');
            // Ensure modal is displayed
            modal.style.display = 'flex';
        } else {
            modal.classList.remove('visible');
            modal.classList.add('hidden');
            // Hide modal after transition
            setTimeout(() => {
                if (modal.classList.contains('hidden')) {
                    modal.style.display = 'none';
                }
            }, 300);
        }
    }

    // Event Listeners
    startBtn.addEventListener('click', function() {
        // Hide the start button
        startBtn.style.display = 'none';
        // Reset any previous game state if needed
        feedback.classList.remove('visible');
        feedback.classList.add('hidden');
        // Start the game by showing the number
        showNumber();
    });

    submitBtn.addEventListener('click', checkAnswer);

    numberInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
    
    // Settings panel events
    settingsBtn.addEventListener('click', () => toggleModal(settingsPanel));
    closeSettings.addEventListener('click', () => toggleModal(settingsPanel));
    
    // Help panel events
    helpBtn.addEventListener('click', () => toggleModal(helpPanel));
    closeHelp.addEventListener('click', () => toggleModal(helpPanel));
    
    // Sound toggle
    soundBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        if (soundEnabled) {
            soundBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            soundBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
    
    // Difficulty change
    difficultySelect.addEventListener('change', (e) => {
        difficulty = e.target.value;
    });
    
    // Theme change
    themeSelect.addEventListener('change', (e) => {
        applyTheme(e.target.value);
    });
    
    // Volume control
    volumeControl.addEventListener('input', (e) => {
        volumeLevel = e.target.value / 100;
        volumeValue.textContent = `${e.target.value}%`;
        
        // Play a short sound to preview volume level
        if (soundEnabled) {
            playSound('correct');
        }
    });
    
    // Initialize game
    updateProgressBar();
    applyTheme(currentTheme);
});