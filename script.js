const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const gulpSound = new Audio("gulp.mp3");
const over = new Audio("over.mp3");
// const bgmusic = new Audio('background_music.mp3')
var bgmusic = new Audio({
    loop: true,
    volume: 1,
    src: ['background_music.mp3']
});
var background_music = new Audio('background_music.mp3');

class SnakePart {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}


let speed = 5;
let score = 0;

// numer of  rows and column
let tileCount = 20;

// size of block
let tileSize = canvas.width / tileCount - 2;

let headX = 10;
let headY = 10;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;


// sname body
const snakeParts = [];
let tailLength = 2;


// gameloop
function drawGame() {
	changeSnakePosition();
	let result = isGameOver();
	if (result) {
		return;
	}
	clearScreen();
	checkAppleCollision();
	drawSnake();

	drawApple();
	drawScore();


	if (score > 4) {
		speed = 8;
	}
	else if (score > 6) {
		speed = 10;
	}
	else if (score > 8) {
		speed = 12;
	}
	else if (score > 10) {
		speed = 14;
	}
	else if (score > 12) {
		speed = 16;
	}
	else if (score > 14) {
		speed = 18;
	}
	else if (score > 16) {
		speed = 20;
	}
	else if (score > 18) {
		speed = 22;
	}
	else if (score > 20) {
		speed = 24;
	}
	else if (score > 22) {
		speed = 26;
	}
	else if (score > 24) {
		speed = 28;
	}
	else if (score > 25) {
		speed = 30;
	}
	else if (score > 28) {
		speed = 32;
	}
	else if (score > 30) {
		speed = 34;
	}
	gameRestart();
	setTimeout(drawGame, 1000 / speed);

}
function isGameOver() {
	let gameOver = false;

	if (yVelocity === 0 && xVelocity === 0) {
		return false;
	}

	// walls
	if (headX < 0) {
		gameOver = true;
	}
	else if (headX === tileCount) {
		gameOver = true;
	}
	else if (headY < 0) {
		gameOver = true;
	}
	else if (headY === tileCount) {
		gameOver = true;
	}
	for (let i = 0; i < snakeParts.length; i++) {
		let part = snakeParts[i];
		if (part.x === headX && part.y === headY) {
			gameOver = true;
			break;
		}
	}
	if (gameOver) {
		context.fillStyle = "white";
		context.font = "100px";
		over.play();
		background_music.pause();
		context.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
	}
	return gameOver;
}
function drawScore() {
	context.fillStyle = "white";
	context.font = "10px";
	context.fillText("Score " + score, canvas.width - 50, 10);
}
function clearScreen() {
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function checkAppleCollision() {
	if (appleX == headX && appleY == headY) {
		appleX = Math.floor(Math.random() * tileCount);
		appleY = Math.floor(Math.random() * tileCount);
		tailLength++;
		score++;
		gulpSound.play();

	}
}

function drawSnake() {
	context.fillStyle = "red";
	context.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
}
function changeSnakePosition() {
	headX = headX + xVelocity;
	headY = headY + yVelocity;
}

function gameRestart(){
	document.addEventListener('keyup', event => {
  		if (event.code === 'Space') {
    	window.location.reload();
  }
})
}


function drawApple() {
	context.fillStyle = "white";
	context.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}


function drawSnake() {
	// background_music.volume = "0.1";
	// background_music.play();
	context.fillStyle = "green";
	for (let i = 0; i < snakeParts.length; i++) {
		let part = snakeParts[i];
		context.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
	}

	snakeParts.push(new SnakePart(headX, headY)); //put an item at the end of the list next to the head
	while (snakeParts.length > tailLength) {
		snakeParts.shift(); // remove the furthet item from the snake parts if have more than our tail size.
	}

	context.fillStyle = "orange";
	context.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

document.addEventListener('keydown', changeDirection);
function changeDirection(e) {
	background_music.volume = "0.1";
	background_music.play();
	if (e.code == "ArrowUp" && yVelocity != 1) {
		xVelocity = 0;
		yVelocity = -1;
	}
	else if (e.code == "ArrowDown" && yVelocity != -1) {
		xVelocity = 0;
		yVelocity = 1;
	}
	else if (e.code == "ArrowLeft" && xVelocity != 1) {
		xVelocity = -1;
		yVelocity = 0;
	}
	else if (e.code == "ArrowRight" && xVelocity != -1) {
		xVelocity = 1;
		yVelocity = 0;
	}
}

drawGame();
