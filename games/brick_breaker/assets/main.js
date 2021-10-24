
/* import Paddle from './paddle.js';
import InputHandler from "./input.js";
import Ball from "./ball.js"; */
import Game from './game.js';

let canvas = document.getElementById("gameScreen");

const WIDTH = "800";
const HEIGHT = "600";

canvas.setAttribute("width", WIDTH);
canvas.setAttribute("height", HEIGHT);
//console.log("done");

let ctx = canvas.getContext("2d");

/* ctx.fillStyle = "red";
ctx.fillRect(20, 20, 100, 100); //start at (20, 20) width 100 height 100

ctx.fillStyle = "blue";
ctx.fillRect(200, 200, 50, 50); */

ctx.clearRect(0, 0, WIDTH, HEIGHT);

/* let ball = new Ball(WIDTH, HEIGHT);
let paddle = new Paddle(WIDTH, HEIGHT);
new InputHandler(paddle) */
let game = new Game(WIDTH, HEIGHT);

let lastTime = 0;
function gameLoop(timestamp) {
    let ctime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    game.update(ctime);
    game.draw(ctx);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);