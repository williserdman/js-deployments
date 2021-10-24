
import Paddle from './paddle.js';
import InputHandler from "./input.js";
import Ball from "./ball.js";
import Brick from './brick.js';
import { build_level, level1, level2 } from './levels.js';

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4,
    WIN: 5
}

export default class Game {
    constructor(gwidth, gheight) {
        this.gwidth = gwidth;
        this.gheight = gheight;
        this.brick = new Brick(this, {x: 0, y: 0});

        this.gamestate = GAMESTATE.MENU;
        this.ball = new Ball(this);
        this.paddle = new Paddle(this);
        new InputHandler(this.paddle, this)
        this.gobjects = [];
        this.lives = 3;
        this.bricks = [];
        this.levels = [level1, level2];
        this.current_level = 0;
    }

    start() {
        if (this.gamestate != GAMESTATE.MENU && this.gamestate != GAMESTATE.NEWLEVEL) return;
        this.ball.reset();
        this.gamestate = GAMESTATE.RUNNING;

        this.bricks = build_level(this, this.levels[this.current_level]);

        this.gobjects = [this.ball, this.paddle];//... is spread operator
    }

    update(ctime) {
        if (this.lives == 0) this.gamestate = GAMESTATE.GAMEOVER;
        if (this.gamestate == GAMESTATE.PAUSED || this.gamestate == GAMESTATE.MENU || this.gamestate == GAMESTATE.GAMEOVER) return;
        [...this.gobjects, ...this.bricks].forEach((Object) => Object.update(ctime))
        this.bricks = this.bricks.filter(object => !object.to_be_deleted);

        if (this.bricks.length == 0) {
            this.current_level++;
            this.gamestate = GAMESTATE.NEWLEVEL
            if (this.current_level > this.levels.length) {
                this.gamestate = GAMESTATE.WIN;
            }
            this.start()
        }
    }

    draw(ctx) {
/*         this.paddle.draw(ctx);
        this.ball.draw(ctx);
        this.brick.draw(ctx); */
        [...this.gobjects, ...this.bricks].forEach((Object) => Object.draw(ctx))
        if(this.gamestate == GAMESTATE.PAUSED) {
            ctx.rect(0, 0, this.gwidth, this.gheight);
            ctx.fillStyle = "rgba(0,0,0,0.5";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.gwidth/2, this.gheight/2);
        }
        if(this.gamestate == GAMESTATE.MENU) {
            ctx.rect(0, 0, this.gwidth, this.gheight);
            ctx.fillStyle = "rgba(0,0,0,1";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Press SPACEBAR to Start", this.gwidth/2, this.gheight/2);
            ctx.font = "20px Arial";
            ctx.fillText("(I'm not even sure if you can win)", this.gwidth/2, this.gheight/2 + 20);
        }

        if(this.gamestate == GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.gwidth, this.gheight);
            ctx.fillStyle = "rgba(0,0,0,1";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gwidth/2, this.gheight/2);
        }

        if(this.gamestate == GAMESTATE.WIN) {
            ctx.rect(0, 0, this.gwidth, this.gheight);
            ctx.fillStyle = "rgba(0,0,0,1";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("YOU WIN!!", this.gwidth/2, this.gheight/2);
        }
    }
    
    toggle_pause() {
        if (this.gamestate == GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
        } else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }
}