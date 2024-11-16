const gameContainer = document.getElementById('game-container');
const paddle1 = document.getElementById('paddle1');
const paddle2 = document.getElementById('paddle2');
const ball = document.getElementById('ball');

let paddle1Y = 210;
let paddle2Y = 210;
let ballX = 390;
let ballY = 240;
let ballSpeedX = 4;
let ballSpeedY = 3;

// Controls
const paddleSpeed = 10;
document.addEventListener('keydown', (e) => {
  if (e.key === 'w' && paddle1Y > 0) {
    paddle1Y -= paddleSpeed;
  } else if (e.key === 's' && paddle1Y < 420) {
    paddle1Y += paddleSpeed;
  } else if (e.key === 'ArrowUp' && paddle2Y > 0) {
    paddle2Y -= paddleSpeed;
  } else if (e.key === 'ArrowDown' && paddle2Y < 420) {
    paddle2Y += paddleSpeed;
  }

  paddle1.style.top = `${paddle1Y}px`;
  paddle2.style.top = `${paddle2Y}px`;
});

// Ball movement
function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collision with top and bottom
  if (ballY <= 0 || ballY >= 485) {
    ballSpeedY *= -1;
  }

  // Ball collision with paddles
  const ballRect = ball.getBoundingClientRect();
  const paddle1Rect = paddle1.getBoundingClientRect();
  const paddle2Rect = paddle2.getBoundingClientRect();

  if (
    ballRect.left <= paddle1Rect.right &&
    ballRect.top + ballRect.height >= paddle1Rect.top &&
    ballRect.bottom - ballRect.height <= paddle1Rect.bottom
  ) {
    ballSpeedX *= -1;
  }

  if (
    ballRect.right >= paddle2Rect.left &&
    ballRect.top + ballRect.height >= paddle2Rect.top &&
    ballRect.bottom - ballRect.height <= paddle2Rect.bottom
  ) {
    ballSpeedX *= -1;
  }

  // Ball out of bounds
  if (ballX <= 0 || ballX >= 785) {
    ballX = 390; // Reset position
    ballY = 240;
    ballSpeedX *= -1; // Change direction
  }

  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;
}

// Game loop
function gameLoop() {
  moveBall();
  requestAnimationFrame(gameLoop);
}

gameLoop();
