import {detect_collision} from "./collisions.js";


export default class Ball {
    constructor(game) {
        this.img = document.getElementById("img_ball");
        this.position = {
            x: 10,
            y: 200
        }
        this.speed = {
            x: 4,
            y: 4
        }
        this.size = 12;
        this.gheight = game.gheight;
        this.gwidth = game.gwidth;
        this.game = game;
        this.reset();
    }

    reset() {
        this.position = {
            x: 10,
            y: 200
        }
        this.speed = {
            x: 4,
            y: 4
        }
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.position.x, this.position.y, this.size, this.size);
    }//end draw

    update(ctime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        
        //left or right collision
        if (this.position.x + this.size > this.gwidth || this.position.x < 0) {
            this.speed.x = -this.speed.x;
        }

        //top or bottom collision
        if (this.position.y < 0) {
            this.speed.y = -this.speed.y;
        }
        if (this.position.y + this.size > this.gheight) {
            this.game.lives--;
            this.reset();
        }

        if (detect_collision(this, this.game.paddle)) {
            this.speed.y = -this.speed.y;
            //console.log(this.speed);
            this.position.y = this.game.paddle.position.y - this.size;
        }
        
    }//end update
}