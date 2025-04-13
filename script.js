document.addEventListener('DOMContentLoaded', () => {
    const numberDisplay = document.getElementById('number-display');
    const timerDisplay = document.getElementById('timer-display');
    const inputSection = document.getElementById('input-section');
    const numberInput = document.getElementById('number-input');
    const submitBtn = document.getElementById('submit-btn');
    const startBtn = document.getElementById('start-btn');
    const feedback = document.getElementById('feedback');
    const levelDisplay = document.getElementById('level');
    const scoreDisplay = document.getElementById('score');

    let currentNumber = '';
    let level = 1;
    let score = 0;
    let timer;

    function generateNumber(level) {
        const length = level + 1;
        let number = '';
        for (let i = 0; i < length; i++) {
            number += Math.floor(Math.random() * 10);
        }
        return number;
    }

    function showNumber() {
        currentNumber = generateNumber(level);
        numberDisplay.textContent = currentNumber;
        numberDisplay.classList.remove('hidden');
        numberDisplay.classList.add('visible');
        let timeLeft = 3;
        timerDisplay.textContent = timeLeft;

        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
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
        inputSection.classList.remove('hidden');
        inputSection.classList.add('visible');
        numberInput.focus();
    }

    function checkAnswer() {
        const userAnswer = numberInput.value;
        feedback.classList.remove('hidden');
        feedback.classList.add('visible');

        if (userAnswer === currentNumber) {
            feedback.textContent = 'Correct!';
            feedback.className = 'correct';
            score += level * 10;
            level++;
        } else {
            feedback.textContent = `Wrong! The number was ${currentNumber}`;
            feedback.className = 'incorrect';
            level = Math.max(1, level - 1);
        }

        scoreDisplay.textContent = score;
        levelDisplay.textContent = level;
        numberInput.value = '';

        setTimeout(() => {
            feedback.classList.remove('visible');
            feedback.classList.add('hidden');
            inputSection.classList.remove('visible');
            inputSection.classList.add('hidden');
            startBtn.style.display = 'block';
        }, 2000);
    }

    startBtn.addEventListener('click', () => {
        startBtn.style.display = 'none';
        showNumber();
    });

    submitBtn.addEventListener('click', checkAnswer);

    numberInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
});