let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let gameOver = true;
let unPressed = true;
let pumpkinCount;
let sweetCount;

let bird = {
  positionX: canvas.width / 2,
  positionY: 10,
  speed: 3.5,
  width: 100,
  height: 100,
};

let player = {
  characterX: canvas.width / 2,
  characterY: canvas.height - 70,
  width: 60,
  height: 70,
  rightPressed: false,
  leftPressed: false,
};

let pumpkin = {
  positionX: [],
  positionY: [],
  width: 40,
  height: 35,
  fallingSpeed: [],
  time: 800,
  score: 0,
};

let sweet = {
  positionX: [],
  positionY: [],
  width: 43,
  height: 30,
  fallingSpeed: [],
  score: 0,
};

let backGroundImg = new Image();
backGroundImg.src = 'images/background.png';

let characterRightImg = new Image();
characterRightImg.src = 'images/character_right.png';

let characterLeftImg = new Image();
characterLeftImg.src = 'images/character_left.png';

let score = new Image();
score.src = 'images/score.png';

let sweetImage = new Image();
sweetImage.src = 'images/sweets.png';

let fallingPumpkinImg = new Image();
fallingPumpkinImg.src = 'images/pumpkin.png';

let birdLeftImage = new Image();
birdLeftImage.src = 'images/birdLeft.png';

let birdRightImage = new Image();
birdRightImage.src = 'images/birdRight.png';

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.getElementById('start').addEventListener('click', startGame);

function startGame() {
  pumpkin.positionX = [];
  pumpkin.positionY = [];
  pumpkin.fallingSpeed = [];
  pumpkin.score = 0;

  sweet.positionX = [];
  sweet.positionY = [];
  sweet.fallingSpeed = [];
  sweet.score = 0;

  gameOver = false;
}

function keyDownHandler(e) {
  if (e.keyCode == 39) {
    player.rightPressed = true;
  } else if (e.keyCode == 37) {
    player.leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    player.rightPressed = false;
  } else if (e.keyCode == 37) {
    player.leftPressed = false;
  }
}

function character() {
  characterPosition();
  if (unPressed) {
    ctx.drawImage(
      characterRightImg,
      player.characterX,
      player.characterY,
      player.width,
      player.height
    );
  } else {
    ctx.drawImage(
      characterLeftImg,
      player.characterX,
      player.characterY,
      player.width,
      player.height
    );
  }
}

function characterPosition() {
  if (player.leftPressed && player.characterX > 0) {
    player.characterX -= 8;
    unPressed = false;
  }
  if (player.rightPressed && player.characterX + player.width < canvas.width) {
    player.characterX += 8;
    unPressed = true;
  }
}

//background
function backGround() {
  ctx.drawImage(backGroundImg, 0, 0, 800, 600);
}

//score
function showScore() {
  ctx.drawImage(score, 10, 8, 200, 100);

  ctx.font = '30px Comic Sans MS';
  ctx.fillStyle = 'black';
  ctx.fillText(pumpkin.score, 140, 69);
}

//sweet Score
function sweetScore() {
  ctx.font = '30px Comic Sans MS';
  ctx.fillStyle = 'black';
  ctx.fillText(sweet.score, 140, 103);
}

//bird
function flyingBird() {
  if (bird.speed == 3.5) {
    ctx.drawImage(
      birdRightImage,
      bird.positionX + bird.speed,
      bird.positionY,
      bird.width,
      bird.height
    );
  }
  if (bird.speed == -3.5) {
    ctx.drawImage(
      birdLeftImage,
      bird.positionX + bird.speed,
      bird.positionY,
      bird.width,
      bird.height
    );
  }

  if (
    bird.positionX + bird.speed > canvas.width - bird.width ||
    bird.positionX + bird.speed < 0
  ) {
    bird.speed = -bird.speed;
  }
  bird.positionX += bird.speed;
}

function setsweet() {
  sweet.positionX.push(bird.positionX);
  sweet.positionY.push(bird.positionY + 40);
  sweet.fallingSpeed.push(Math.floor(Math.random() * 5) + 5);

  sweetCount = sweet.positionX.length;
}

function fallingsweet() {
  for (let i = 0; i < sweetCount; i++) {
    ctx.drawImage(
      sweetImage,
      sweet.positionX[i],
      sweet.positionY[i],
      sweet.width,
      sweet.height
    );
    sweet.positionY[i] += sweet.fallingSpeed[i];
  }
}

function setPumpkin() {
  pumpkin.positionX.push(Math.floor(Math.random() * 720 + 40));
  pumpkin.positionY.push(bird.positionY);
  pumpkin.fallingSpeed.push(Math.floor(Math.random() * 5) + 5);

  pumpkinCount = pumpkin.positionX.length;
}

function fallingPumpkin() {
  for (let i = 0; i < pumpkinCount; i++) {
    ctx.drawImage(
      fallingPumpkinImg,
      pumpkin.positionX[i],
      pumpkin.positionY[i],
      pumpkin.width,
      pumpkin.height
    );
    pumpkin.positionY[i] += pumpkin.fallingSpeed[i];
  }
}

function updateScreen() {
  for (let i = 0; i < sweet.positionY.length; i++) {
    if (
      player.characterX < sweet.positionX[i] + sweet.width / 2 &&
      player.characterX + player.width > sweet.positionX[i] &&
      player.characterY < sweet.positionY[i] + sweet.height / 2
    ) {
      sweet.score++;
      sweet.positionX[i] = undefined;
      sweet.positionY[i] = undefined;
    }
    if (sweet.positionY[i] > canvas.height - sweet.height) {
      sweet.positionX[i] = undefined;
      sweet.positionY[i] = undefined;
    }
  }
  for (let j = 0; j < pumpkin.positionY.length; j++) {
    if (pumpkin.positionY[j] > canvas.height - pumpkin.height) {
      pumpkin.score++;
      pumpkin.positionX[j] = undefined;
      pumpkin.positionY[j] = undefined;
    }
    if (
      player.characterX < pumpkin.positionX[j] + pumpkin.width / 2 &&
      player.characterX + player.width > pumpkin.positionX[j] &&
      player.characterY < pumpkin.positionY[j] + pumpkin.height / 2
    ) {
      gameOver = true;
    }
  }
}

function showResult() {
  backGround();
  ctx.drawImage(score, 230, 200, 350, 180);

  ctx.font = '40px Comic Sans MS';
  ctx.fillStyle = 'black';
  ctx.fillText(pumpkin.score, 430, 300);
  ctx.fillText(sweet.score, 430, 360);
}

//clear canvas
function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function trackGame() {
  if (!gameOver) {
    clear();
    backGround();
    showScore();
    character();
    sweetScore();
    flyingBird();
    fallingsweet();
    fallingPumpkin();
    updateScreen();
  } else {
    showResult();
  }
}
let gameTrack = setInterval(trackGame, 100);
let sweetTimer = setInterval(setsweet, 7000);
let pumpkinTimer = setInterval(setPumpkin, pumpkin.time);
