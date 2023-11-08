const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector('#score');
const timerDisplay = document.querySelector('#timer');

let time = 10;
let timer;
let points = 0;
let lastHole;

const audioHit = new Audio('hard-slap-46388.mp3');


// Generates a random integer between min and max (inclusive)
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Determines the delay based on the game difficulty
function setDelay(difficulty) {
    if (difficulty === "easy") {
        return 1500;
    } else if (difficulty === "normal") {
        return 1000;
    } else if (difficulty === "hard") {
        return randomInteger(600, 1200);
    }
}

// Chooses a random hole ensuring it's not the same as the last one
function chooseHole(holes) {
    const index = randomInteger(0, holes.length - 1);
    const hole = holes[index];
    if (hole === lastHole) {
        return chooseHole(holes);
    }
    lastHole = hole;
    return hole;
}

// Shows and hides the mole in the specified hole after a delay
function showAndHide(hole, delay) {
    hole.classList.add('show');
    setTimeout(() => {
        hole.classList.remove('show');
        if (time > 0) {
            showAndHide(chooseHole(holes), setDelay("normal"));
        } else {
            stopGame();
        }
    }, delay);
}

// Updates the player's score and displays it on the screen
function updateScore() {
    points++;
    score.textContent = points;
}

// Clears the player's score
function clearScore() {
    points = 0;
    score.textContent = points;
}

// Updates the game timer and stops the game when time runs out
function updateTimer() {
    timerDisplay.textContent = time;
    time--;
    if (time < 0) {
        stopGame();
    }
}

// Handles the logic when a mole is clicked (whacked) by the player
function whack() { 
    updateScore();
    audioHit.currentTime = 0;
    audioHit.play(); 
    return points;
}

// Sets event listeners for mole clicks
function setEventListeners(){
  moles.forEach(
    mole => mole.addEventListener('click',whack)
  );
  return moles;
}

// Sets timer
function startTimer() {
    timer = setInterval(updateTimer, 1000);
}

// Starts the game by initializing timer, score, and displaying moles
function startGame() {

    if (timer) {
        clearInterval(timer); 
    }
    
    time = 10; 
    timerDisplay.textContent = time; 
    
    clearScore();
    

    startTimer();
    showAndHide(chooseHole(holes), setDelay("normal")); 
    moles.forEach(mole => mole.removeEventListener('click', whack));
    setEventListeners(); 
}

// Stops the game, clears the timer, displays the final score, and resets score
function stopGame() {
    clearInterval(timer);
    alert('Game Over! Your final score is ' + points);
    clearScore()
    
}

startButton.addEventListener('click', startGame);
setEventListeners();

// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.time = time;
window.setEventListeners = setEventListeners;
