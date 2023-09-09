const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const timerDisplay = document.getElementById('timer');
let timerInterval;
let totalSeconds = 0;
let isRunning = false;

function updateTimerDisplay() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (!isRunning) {
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        totalSeconds = hours * 3600 + minutes * 60 + seconds;

        if (totalSeconds > 0) {
            startButton.disabled = true;
            stopButton.disabled = false; // Enable the "Stop" button
            resetButton.disabled = true;
            hoursInput.disabled = true;
            minutesInput.disabled = true;
            secondsInput.disabled = true;

            updateTimerDisplay();
            timerInterval = setInterval(() => {
                if (totalSeconds === 0) {
                    clearInterval(timerInterval);
                    playBeepSound();
                    startButton.disabled = false;
                    stopButton.disabled = true; // Disable the "Stop" button
                    resetButton.disabled = false;
                    hoursInput.disabled = false;
                    minutesInput.disabled = false;
                    secondsInput.disabled = false;
                    isRunning = false;
                    startTimer(); // Start the timer again
                } else {
                    totalSeconds--;
                    updateTimerDisplay();
                }
            }, 1000);
            isRunning = true;
        }
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    startButton.disabled = false;
    stopButton.disabled = true; // Disable the "Stop" button
    resetButton.disabled = false;
    hoursInput.disabled = false;
    minutesInput.disabled = false;
    secondsInput.disabled = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    totalSeconds = 0;
    updateTimerDisplay();
    startButton.disabled = false;
    stopButton.disabled = true; // Disable the "Stop" button
    resetButton.disabled = false;
    hoursInput.disabled = false;
    minutesInput.disabled = false;
    secondsInput.disabled = false;
}

function playBeepSound() {
    const beep = new Audio('beep.mp3'); // Replace 'beep.mp3' with your beep sound file
    beep.play();
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer); // Add this event listener
resetButton.addEventListener('click', resetTimer);
