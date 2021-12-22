export default class Ant {
  ANT_WIDTH = 4;
  ANT_HEIGHT = 4;
  WANDER_AMM = 0.0;
  MAX_SPEED = 2;
  SLIME = 1;

  constructor(position) {
    this.position = {
      x: position.x,
      y: position.y
    };
    this.direction = Math.random() * 2 * Math.PI - Math.PI;
    this.speed = {
      x: 0,
      y: 0
    };
    //this.#move();
  }

  update(ctx) {
    this.#move(ctx);
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    // checking left and right
    if (this.position.x < 0) {
      this.position.x = 0;
      //this.speed.x = -this.speed.x;
      this.direction = Math.random() * 2 * Math.PI - Math.PI;
    }
    if (this.position.x > window.innerWidth) {
      this.position.x = window.innerWidth;
      //this.speed.x = -this.speed.x;
      this.direction = Math.random() * 2 * Math.PI - Math.PI;
    }
    // checking top and bottom
    if (this.position.y < 0) {
      this.position.y = 0;
      //this.speed.y = -this.speed.y;
      this.direction = Math.random() * 2 * Math.PI - Math.PI;
    }
    if (this.position.y > window.innerHeight) {
      this.position.y = window.innerHeight;
      //this.speed.y = -this.speed.y;
      this.direction = Math.random() * 2 * Math.PI - Math.PI;
    }

    this.#draw(ctx);
  }

  #draw(ctx) {
    ctx.fillStyle = "cyan";
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.ANT_WIDTH,
      this.ANT_HEIGHT
    );
    /*     ctx.fillStyle = "green";
    ctx.fillRect(
      this.position.x,
      this.position.y - 10,
      this.ANT_WIDTH,
      this.ANT_HEIGHT
    ); */
  }

  #move(ctx) {
    const randomAngle = Math.random() * 2 * Math.PI - Math.PI;
    this.direction = this.direction + randomAngle * this.WANDER_AMM;
    this.#getDirection(ctx);
    this.speed.x = Math.cos(this.direction) * this.MAX_SPEED;
    this.speed.y = Math.sin(this.direction) * this.MAX_SPEED;
  }
  #pixelGrab(ctx, sides) {
    let tempX = this.speed.x;
    let tempY = this.speed.y;
    let xVal = this.position.x + 4 * tempX;
    let yVal = this.position.y + 4 * tempY;
    const topVal =
      (ctx
        .getImageData(xVal, yVal, sides, sides)
        .data.reduce((a, b) => a + b, 0) -
        255) /
      (255 * sides * sides * 4);

    tempX = Math.cos(this.direction + Math.PI / 2) * this.MAX_SPEED;
    tempY = Math.sin(this.direction + Math.PI / 2) * this.MAX_SPEED;
    xVal = this.position.x + 4 * tempX;
    yVal = this.position.y + 4 * tempY;
    const leftVal =
      (ctx
        .getImageData(xVal, yVal, sides, sides)
        .data.reduce((a, b) => a + b, 0) -
        255) /
      (255 * sides * sides * 4);

    tempX = Math.cos(this.direction - Math.PI / 2) * this.MAX_SPEED;
    tempY = Math.sin(this.direction - Math.PI / 2) * this.MAX_SPEED;
    xVal = this.position.x + 4 * tempX;
    yVal = this.position.y + 4 * tempY;
    const rightVal =
      (ctx
        .getImageData(xVal, yVal, sides, sides)
        .data.reduce((a, b) => a + b, 0) -
        255) /
      (255 * sides * sides * 4);

    return { topVal, leftVal, rightVal };
  }
  #getDirection(ctx) {
    const obj = this.#pixelGrab(ctx, 2);

    const lTilt = (Math.PI / 2) * obj.leftVal;
    const rTilt = -(Math.PI / 2) * obj.rightVal;
    console.log(obj.topVal);
    this.direction += (lTilt + rTilt) * (1 - obj.topVal) * this.SLIME;
  }
}
