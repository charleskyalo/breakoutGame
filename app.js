const canvas = document.getElementById('myCanvas');
const canvasContext = canvas.getContext('2d');

/* draw a rectangle */
 

canvasContext.beginPath();
canvasContext.rect(20, 10, 200, 50);
canvasContext.fillStyle = '#ff0000';
canvasContext.strokeStyle = "rgb(255,0,0)";
canvasContext.stroke();
// canvasContext.fill();
canvasContext.closePath();

/* draw a circle */
canvasContext.beginPath();
canvasContext.arc(100, 100, 30, 0, Math.PI * 2, false);
canvasContext.fillStyle = "green";
canvasContext.strokeStyle = "rgba(0,0,255,0.5)";
canvasContext.stroke();
// canvasContext.fill();
canvasContext.closePath();
