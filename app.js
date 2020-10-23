const canvas = document.getElementById('myCanvas');
const canvasContext = canvas.getContext('2d');

/* draw a rectangle */
/*
rectangle drawing
canvasContext.beginPath();
canvasContext.rect(20, 10, 200, 50);
canvasContext.fillStyle = '#ff0000';
canvasContext.strokeStyle = "rgb(255,0,0)";
canvasContext.stroke();
 canvasContext.fill();
canvasContext.closePath(); */

/* draw a circle */
/* experiamented with stroke method;
canvasContext.strokeStyle = "rgba(0,0,255,0.5)";
canvasContext.stroke(); */

let x = canvas.width / 2;
let y = canvas.height - 30;

/* change in X-axis  and   Y-axis*/
let dx = +1;
let dy = -2;
const ballRadius = 10;

let rightPressed = false;
let leftPressed = false;

/* paddle to hit the ball */
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

/* set brick variables */

let brickRowCount = 5;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
/* score variable */
let score = 0;
let lives = 1;
let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };

    }
}
/* key event keyDown  and keyup */
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
/* mouse Event */
document.addEventListener("mousemove", mouseMoveHandler, false);


function keyDownHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = true;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = true;
    }
}



function keyUpHandler(e) {
    if (e.key == "Right " || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left " || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}


function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }

}
function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    /* if All bricks have been hit  */
                    if (score == brickRowCount * brickColumnCount) {
                        alert("You win congratulations ");
                        document.location.reload();
                        clearInterval(interval);
                    }
                }
            }
        }
    }
}


function drawBall() {
    /* draw ball */
    canvasContext.beginPath();
    canvasContext.arc(x, y, ballRadius, 0, Math.PI * 2);
    canvasContext.fillStyle = "#0095DD";
    canvasContext.fill();
    canvasContext.closePath();
}



function drawPaddle() {
    canvasContext.beginPath();
    canvasContext.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    canvasContext.fillStyle = "#0095DD";
    canvasContext.fill();
    canvasContext.closePath();
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                canvasContext.beginPath();
                canvasContext.rect(brickX, brickY, brickWidth, brickHeight);
                canvasContext.fillStyle = "#0095DD";
                canvasContext.fill();
                canvasContext.closePath();
            }
        }
    }
}

/* add score function */
function drawScore() {
    canvasContext.font = "16px Arial";
    canvasContext.fillStyle = "#0095DD";
    canvasContext.textAlign = "center";
    canvasContext.fillText("Score: " + score, 250, 20);
}
function drawLives() {
    canvasContext.font = "16px Arial";
    canvasContext.fillStyle = "#0095DD";
    canvasContext.fillText("Lives: " + lives, canvas.width - 65, 20);

}

function draw() {
    /* drawing code */
    /* clearing the canvas width drawing and clearing the width */
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    /* bounce the ball on the right side and the left side */
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            lives--;
            if (!lives) {
                alert(`game over  you scored  ${score}`);
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    /* (left/right)   arrow key pressed */
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    x += dx;
    y += dy;
    /* request Animation frame */
    requestAnimationFrame(draw);

}

// window.requestAnimationFrame(draw,10);
draw();
