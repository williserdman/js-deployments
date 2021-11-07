export default class EventHandler {

    constructor() {
        this.mousePosition = {};
        document.addEventListener("mousemove", (e) => {
            this.mousePosition.changeX = e.movementX;
            this.mousePosition.changeY = e.movementY;
            console.log(this.mousePosition)
        }, false);

        this.movements = {}
        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "w":
                case "ArrowUp":
                    this.movements.forward = true;
                    break;
                case "a":
                case "ArrowLeft":
                    this.movements.left = true;
                    break;
                case "s":
                case "ArrowDown":
                    this.movements.back = true;
                    break;
                case "d":
                case "ArrowRight":
                    this.movements.right = true;
                    break;
                case "q":
                    this.movements.q = true;
                    break;
                case "e":
                    this.movements.e = true;
            } //switch
        }) //event listener

        //this.one = 1;
    }

    update() {
    }
}