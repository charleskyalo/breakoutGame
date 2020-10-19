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



document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == 'Right' || e.key =='ArrowRight') {
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

function draw() {
/* drawing code */
    
/* clearing the canvas width drawing and clearing the width */
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();
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
            alert('GAME OVER');
            document.location.reload();
            clearInterval(interval);
        }
    }

    /* (left/right)   arrow key pressed */
    if (rightPressed && paddleX < canvas.width-paddleWidth ) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    x += dx;
    y += dy;
}

// window.requestAnimationFrame(draw,10);
let interval = setInterval(draw, 10);
