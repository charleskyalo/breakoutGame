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

const dx = +1;
const dy = -2;

function drawBall() {
/* draw ball */
    canvasContext.beginPath();
    canvasContext.arc(x, y, 10, 0, Math.PI * 2);
    canvasContext.fillStyle = "#0095DD";
    canvasContext.fill();
    canvasContext.closePath();
}




function draw() { 
/* drawing code */
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    x += dx;
    y += dy;
}

// window.requestAnimationFrame(draw,10);
setInterval(draw,10);