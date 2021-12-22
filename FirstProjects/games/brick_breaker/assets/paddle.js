
export default class Paddle {
    constructor(game) {
        this.max_width = game.gwidth;
        this.width = 120;
        this.height = 20;
        this.position = {
            x: game.gwidth/2 - this.width/2,
            y: game.gheight - this.height - 10
        }
        this.max_speed = 7;
        this.speed = 0;
    }

    draw(ctx) {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime) {
        //this.position.x += 5/deltaTime;
        this.position.x += this.speed;
        
        if (this.position.x < 0) {this.position.x = 0};
        if (this.position.x + this.width > this.max_width) {this.position.x = this.max_width - this.width};
    }

    moveLeft() {
        this.speed = -this.max_speed;
    }
    moveRight() {
        this.speed = this.max_speed;
    }
    stop() {
        this.speed = 0;
    }

}
