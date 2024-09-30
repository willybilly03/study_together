let timerInterval;
let startTime;
let running = false;
let startStopButton = document.getElementById("startStopButton");
let resetButton = document.getElementById("resetButton");
let bull = document.getElementById("bull");

startStopButton.addEventListener("click", function() {
    if (!running) {
        startTimer();
        bull.classList.add("shaking", "slow");
        startStopButton.textContent = "¡Aguanta!";
    } else {
        stopTimer();
        bull.classList.remove("shaking", "slow", "medium", "fast");
        startStopButton.textContent = "¡Montar de nuevo!";
    }
});

resetButton.addEventListener("click", resetTimer);

function startTimer() {
    running = true;
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 10);
}

function stopTimer() {
    running = false;
    clearInterval(timerInterval);
}

function updateTimer() {
    let currentTime = Date.now();
    let elapsedTime = currentTime - startTime;

    let milliseconds = parseInt((elapsedTime % 1000) / 10);
    let seconds = parseInt((elapsedTime / 1000) % 60);
    let minutes = parseInt((elapsedTime / (1000 * 60)) % 60);

    document.getElementById("milliseconds").textContent = formatTime(milliseconds);
    document.getElementById("seconds").textContent = formatTime(seconds);
    document.getElementById("minutes").textContent = formatTime(minutes);

    // Ajusta la velocidad del toro
    adjustBullSpeed(seconds);
}

function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

function resetTimer() {
    clearInterval(timerInterval);
    running = false;
    document.getElementById("milliseconds").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    startStopButton.textContent = "¡Montar el toro!";
    bull.classList.remove("shaking", "slow", "medium", "fast");
}

function adjustBullSpeed(seconds) {
    if (seconds >= 0 && seconds < 10) {
        bull.classList.add("slow");
        bull.classList.remove("medium", "fast");
    } else if (seconds >= 10 && seconds < 20) {
        bull.classList.add("medium");
        bull.classList.remove("slow", "fast");
    } else if (seconds >= 20) {
        bull.classList.add("fast");
        bull.classList.remove("slow", "medium");
    }
}