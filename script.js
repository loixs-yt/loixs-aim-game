const target = document.getElementById('target');
const follower = document.getElementById('follower');
const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.querySelector('#score span');
const backgroundMusic = document.getElementById('backgroundMusic');
const gameOverSound = document.getElementById('gameOverSound');
let score = 0;
let gameRunning = true;

let posX = 0;
let direction = 1;
let speed = 10;
const speedIncrement = 0.7;

const instructionMessages = [
  { text: "Appuie sur la cible", duration: 3000 },
  { text: "Avant que la balle ne touche le bord", duration: 3000 },
  { text: "Attention ça va de plus en plus vite", duration: 3000 }
];

function displayInstructionMessages() {
  let delay = 0;
  instructionMessages.forEach((message, index) => {
    setTimeout(() => {
      const instruction = document.createElement('div');
      instruction.innerText = message.text;
      instruction.classList.add('instruction-message');
      instruction.style.fontSize = "36px"; // Augmente la taille du texte
      gameArea.appendChild(instruction);
      setTimeout(() => {
        gameArea.removeChild(instruction);
      }, message.duration);
    }, delay);
    delay += message.duration;
  });
}

function randomPosition() {
  const maxWidth = gameArea.offsetWidth - target.offsetWidth;
  const randomX = Math.floor(Math.random() * maxWidth);
  return randomX;
}

function moveTarget() {
  if (!gameRunning) return;
  
  posX += speed * direction;
  const maxWidth = gameArea.offsetWidth - target.offsetWidth;

  if (posX >= maxWidth || posX <= 0) {
    if (target.style.backgroundColor === "red") {
      gameOver();
      return;
    } else {
      posX = posX >= maxWidth ? maxWidth : 0;
      direction *= -1;
      target.style.backgroundColor = "red";
    }
  }

  target.style.left = posX + 'px';
  requestAnimationFrame(moveTarget);
}

moveTarget();

document.addEventListener('mousemove', (e) => {
  follower.style.left = e.pageX - follower.offsetWidth / 2 + 'px';
  follower.style.top = e.pageY - follower.offsetHeight / 2 + 'px';
});

target.addEventListener('mousedown', () => {
  if (target.style.backgroundColor !== "black") {
    target.style.backgroundColor = "black";
    target.classList.add('clicked');
    score++;
    speed += speedIncrement;
    scoreDisplay.textContent = score;
  }
});

function gameOver() {
  gameRunning = false;
  backgroundMusic.pause();
  gameOverSound.play();
  const gameOverMessage = document.createElement('div');
  gameOverMessage.classList.add('game-over-message');
  let rank;

  if (score >= 0 && score <= 5) {
    rank = "FER";
  } else if (score >= 6 && score <= 9) {
    rank = "BRONZE";
  } else if (score >= 10 && score <= 14) {
    rank = "ARGENT";
  } else if (score >= 15 && score <= 19) {
    rank = "OR";
  } else if (score >= 20 && score <= 34) {
    rank = "DIAMANT";
  } else if (score >= 35 && score <= 49) {
    rank = "MAITRE 1";
  } else {
    rank = "TOP PLAYER";
  }

  gameOverMessage.innerHTML = "Game Over ! <br> Votre score : " + score + " <br> Votre rang : " + rank;
  gameArea.appendChild(gameOverMessage);
}

backgroundMusic.play();

displayInstructionMessages();
