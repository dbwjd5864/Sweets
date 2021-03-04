let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
var gameOver = true;
var pumpkinCount;
var candyCount;

var witch = {
  positionX: canvas.width/2,
  positionY: 10,
  speed: 3.5,
  width: 100,
  height: 100
};

var player = {
    characterX: canvas.width/2,
    characterY: canvas.height - 70,
    width: 60,
    height: 70,
    rightPressed: false,
    leftPressed: false
};

var pumpkin = {
    positionX: [],
    positionY: [],
    width: 35,
    height: 35,
    fallingSpeed: [],
    time: 800,
    score: 0
};

var candy = {
    positionX: [],
    positionY: [],
    width: 43,
    height: 30,
    fallingSpeed: [],
    score: 0
};

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.getElementById("start").addEventListener("click", startGame);

function startGame(){
  gameOver = false;
}

function keyDownHandler(e) {
	if(e.keyCode == 39){
		player.rightPressed = true;
	}
	else if(e.keyCode == 37){
		player.leftPressed = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 39){
		player.rightPressed = false;
	}
	else if(e.keyCode == 37){
		player.leftPressed = false;
	}
}

function characterPosition() {
	if(player.leftPressed && player.characterX > 0){
		player.characterX -= 8;
	}
	if(player.rightPressed && player.characterX + player.width < canvas.width) {
		player.characterX += 8;
	}
}

//background
function backGround(){
  let backGround = new Image();
  backGround.src = "images/background.jpg";
  ctx.drawImage(backGround, 0, 0, 800, 600);
}

//character
function character(){
  let character = new Image();
  character.src = "images/character.png";
  ctx.drawImage(character, player.characterX, player.characterY, player.width, player.height);
  characterPosition();
}

//score
function pumpkinScore(){
  let score = new Image();
  score.src = "images/score.png";
  ctx.drawImage(score, 10, 8, 215, 100);

  ctx.font = "42px Comic Sans MS";
  ctx.fillStyle = "#fe9a16";
  ctx.fillText(pumpkin.score, 147, 68);
}

//candy Score
function candyScore(){
  let candyImage = new Image();
  candyImage.src = "images/candy.png";
  ctx.drawImage(candyImage, 30, 110, 50, 30);

  ctx.font = "37px Comic Sans MS";
  ctx.fillStyle = "#c016fe";
  ctx.fillText(candy.score, 100, 140);
}

//witch
function flyingWitch(){
  let witchImage = new Image();
  if(witch.speed == 3.5){
    witchImage.src = "images/witch_right.png";
    ctx.drawImage(witchImage, witch.positionX + witch.speed, witch.positionY, witch.width, witch.height);
  }
  if(witch.speed == -3.5){
    witchImage.src = "images/witch_left.png";
    ctx.drawImage(witchImage, witch.positionX + witch.speed, witch.positionY, witch.width, witch.height);
  }
  if(witch.positionX + witch.speed > canvas.width - witch.width || witch.positionX + witch.speed < 0){
    witch.speed = -witch.speed;
  }
  witch.positionX += witch.speed;
}

function setCandy(){
  candy.positionX.push(witch.positionX);
  candy.positionY.push(witch.positionY);
  candy.fallingSpeed.push((Math.floor(Math.random()*5)+5));

  candyCount = candy.positionX.length;
}

function fallingCandy(){
  let fallingCandy = new Image();
  fallingCandy.src = "images/candy.png";
  for(var i=0; i< candyCount; i++){
    ctx.drawImage(fallingCandy, candy.positionX[i], candy.positionY[i], candy.width, candy.height);
    candy.positionY[i] += candy.fallingSpeed[i];
  }
}

function setPumpkin(){
  pumpkin.positionX.push(Math.floor((Math.random()*720)+ 40));
  pumpkin.positionY.push(witch.positionY);
  pumpkin.fallingSpeed.push((Math.floor(Math.random()*5)+5));

  pumpkinCount = pumpkin.positionX.length;
}

function fallingPumpkin(){
	let fallingPumpkin = new Image();
	fallingPumpkin.src = "images/pumpkin.png";
	for(var i=0; i< pumpkinCount; i++){
		ctx.drawImage(fallingPumpkin, pumpkin.positionX[i], pumpkin.positionY[i], pumpkin.width, pumpkin.height);
		pumpkin.positionY[i] += pumpkin.fallingSpeed[i];
	}
}

function updateScreen(){
  for(var i=0; i<candy.positionY.length; i++){
    if(player.characterX < candy.positionX[i] + candy.width/2 && player.characterX + player.width > candy.positionX[i] && player.characterY < candy.positionY[i] + candy.height/2){
      candy.score++;
      candy.positionX[i] = undefined;
      candy.positionY[i] = undefined;

    }
    if(candy.positionY[i] > canvas.height-candy.height){
      candy.positionX[i] = undefined;
      candy.positionY[i] = undefined;
    }
  }
  for(var j=0; j<pumpkin.positionY.length; j++){
    if(pumpkin.positionY[j] > canvas.height-pumpkin.height){
      pumpkin.score++;
      pumpkin.positionX[j] = undefined;
      pumpkin.positionY[j] = undefined;
    }
    if(player.characterX < pumpkin.positionX[j] + pumpkin.width/2 && player.characterX + player.width > pumpkin.positionX[j] && player.characterY < pumpkin.positionY[j] + pumpkin.height/2){
      gameOver = true;
    }
  }
}

function showResult(){
  pumpkin.positionX = [];
  pumpkin.positionY = [];
  pumpkin.fallingSpeed = [];
  pumpkin.score = 0;

  candy.positionX = [];
  candy.positionY = [];
  candy.fallingSpeed = [];
  candy.score = 0;
}

//clear canvas
function clear(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function trackGame(){
  if(!gameOver){
    clear();
    backGround();
    pumpkinScore();
    character();
    candyScore();
    flyingWitch();
    fallingCandy();
    fallingPumpkin();
    updateScreen();
 }
 else{
    showResult();
 }
}

var trackGame = setInterval(trackGame, 100);
var candyTimer = setInterval(setCandy, 7000);
var pumpkinTimer = setInterval (setPumpkin, pumpkin.time);
