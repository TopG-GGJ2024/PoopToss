const poopTop = document.querySelector('.poop-top');
const stool = document.querySelector('.stool');
const targetPot = document.querySelector('.target-pot');
const gameContainer = document.querySelector('.game-container');
const scoreDisplay = document.querySelector('.score');
const livesDisplay = document.querySelector('.lives');

const poopSound = new Audio('poop_sound.mp3');
const splashSound = new Audio('splash_sound.mp3');
const gameOverSound = new Audio('game_over_sound.mp3');
const poopHitTargetSound = new Audio('poop_hit_target.mp3');

let score = 0;
let chances = 3;
let horizontalAcceleration = 0;
let poopInterval;

document.addEventListener('keydown', moveStool);

function moveStool(event) {
    const stoolSpeed = 50; // Adjust this value for the desired speed
    const accelerationStep = 1;
    const maxRightPosition = gameContainer.clientWidth * 0.8; // 80% of the game container's width

    if (event.key === 'ArrowLeft' && stool.offsetLeft > 50) {
        stool.style.left = `${stool.offsetLeft - (stoolSpeed + horizontalAcceleration)}px`;
    } else if (event.key === 'ArrowRight' && stool.offsetLeft + stool.offsetWidth < maxRightPosition) {
        stool.style.left = `${stool.offsetLeft + (stoolSpeed + horizontalAcceleration)}px`;
    }

    if (horizontalAcceleration < 10) {
        horizontalAcceleration += accelerationStep;
    }
}

function dropPoop() {
    const poopSize = Math.floor(Math.random() * 30) + 40;
    const poop = document.createElement('img');
    poop.className = 'poop';
    poop.src = 'shitt.png';
    poop.style.width = `${poopSize}px`;
    poop.style.height = `${poopSize}px`;
    poop.style.position = 'absolute';
    poop.style.top = '20%';
    poop.style.left = '15%';

    const monkey = document.querySelector('.poop-top img');
    monkey.src = 'fart.png';

    gameContainer.appendChild(poop);

    setTimeout(() => {
        monkey.src = 'monkey1.png';
    }, 400);

    poopSound.play();

    const initialSpeedX = Math.random() * 5 + 10;
    const initialSpeedY = Math.random() * 2 + 10;
    let speedX = initialSpeedX;
    let speedY = initialSpeedY;
    const gravity = 0.6;

    const poopFall = setInterval(() => {
        const poopBottom = poop.offsetTop + poop.offsetHeight;

        if (poopBottom < gameContainer.clientHeight) {
            poop.style.top = `${poop.offsetTop + speedY}px`;
            poop.style.left = `${poop.offsetLeft + speedX}px`;

            speedY += gravity;

            if (poop.offsetLeft <= 0 || poop.offsetLeft + poop.offsetWidth >= gameContainer.clientWidth) {
                speedX = -speedX;
            }

            if (
                poopBottom > stool.offsetTop &&
                poop.offsetTop < stool.offsetTop + stool.offsetHeight &&
                poop.offsetLeft + poop.offsetWidth > stool.offsetLeft &&
                poop.offsetLeft < stool.offsetLeft + stool.offsetWidth
            ) {
                speedY = -initialSpeedY;
                horizontalAcceleration = 0;
            }

            if (
                poop.offsetTop + poop.offsetHeight > targetPot.offsetTop &&
                poop.offsetLeft + poop.offsetWidth > targetPot.offsetLeft &&
                poop.offsetLeft < targetPot.offsetLeft + targetPot.offsetWidth
            ) {
                gameContainer.removeChild(poop);
                clearInterval(poopFall);
                updateScore();
                splashSound.play();
                poopHitTargetSound.play();
            }
        } else {
            createSplash(poop.offsetLeft, gameContainer.clientHeight - 20);
            gameContainer.removeChild(poop);
            clearInterval(poopFall);
            loseLife();
        }
    }, 16.666);
}

function createSplash(x, y) {
    const splash = document.createElement('img');
    splash.className = 'splash';
    splash.src = 'splash.png';
    splash.style.position = 'absolute';
    splash.style.width = '80px';
    splash.style.height = '80px';
    splash.style.left = `${x - 40}px`;
    splash.style.top = `${y - 60}px`;

    gameContainer.appendChild(splash);

    splash.offsetWidth;

    splash.style.animation = 'splashAnimation 0.5s forwards';

    setTimeout(() => {
        gameContainer.removeChild(splash);
    }, 500);
}

function updateScore() {
    score++;
    updateScoreDisplay();
}

function updateScoreDisplay() {
    scoreDisplay.textContent = `Shit Caught: ${score}`;
    updateHighScore();
}

function updateHighScore() {
    // Update high score logic here
    // Assuming there is an element with class 'high-score' for displaying high score
    const highScoreDisplay = document.querySelector('.high-score');
    highScoreDisplay.textContent = `High Score: ${highScore}`;
}

function loseLife() {
    chances--;

    if (chances >= 0) {
        const brownShade = document.querySelector('.brown-shade');

        if (chances === 2) {
            brownShade.style.backgroundColor = 'rgba(139, 69, 19, 0.2)';
        } else if (chances === 1) {
            brownShade.style.backgroundColor = 'rgba(139, 69, 19, 0.5)';
        }

        livesDisplay.textContent = `Chances: ${chances}`;

        if (chances === 0) {
            window.location.href = 'home.html';
        }
    } else {
        clearInterval(poopInterval);
        showEndgameScreen();
    }
}

function showEndgameScreen() {
    const endgameScreen = document.getElementById('endgame-screen');
    const endgameScore = document.getElementById('endgame-score');
    
    endgameScore.textContent = `Shit Caught: ${score}`;
    endgameScreen.style.display = 'flex';
    endgameScreen.style.animation = 'slideDown 5s forwards';

    gameOverSound.play();
}

function resetGame() {
    const endgameScreen = document.getElementById('endgame-screen');
    endgameScreen.style.display = 'none';
    score = 0;
    chances = 3;
    updateScoreDisplay();
    poopInterval = setInterval(dropPoop, 2000);
}

poopInterval = setInterval(dropPoop, 2000);
