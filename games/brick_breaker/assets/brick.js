import { detect_collision } from "./collisions.js";

export default class Brick {
  constructor(game, position) {
    this.image = document.getElementById("brick_img");
    

    this.game = game;

    this.position = position;
    this.width = this.game.gwidth/10;
    this.height = 24;

    this.to_be_deleted = false;
  }

  update() {
    if (detect_collision(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;

      this.to_be_deleted = true;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
