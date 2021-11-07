export default class EventHandler {

    constructor() {
        this.mousePosition = {};
        document.addEventListener("mousemove", (e) => {
            this.mousePosition.changeX = e.movementX;
            this.mousePosition.changeY = e.movementY;
        }, false);

        this.action = {}
        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "w":
                //case "ArrowUp":
                    this.action.forward = true;
                    break;
                case "a":
                //case "ArrowLeft":
                    this.action.left = true;
                    break;
                case "s":
                //case "ArrowDown":
                    this.action.back = true;
                    break;
                case "d":
                //case "ArrowRight":
                    this.action.right = true;
                    break;
                case "e":
                    this.action.special1 = true;
                    break;
                case "q":
                    this.action.special2 = true;
                    break;
            } //switch
        }) //event listener key down
        document.addEventListener("keyup", (e) => {
            switch (e.key) {
                case "w":
                //case "ArrowUp":
                    this.action.forward = false;
                    break;
                case "a":
                //case "ArrowLeft":
                    this.action.left = false;
                    break;
                case "s":
                //case "ArrowDown":
                    this.action.back = false;
                    break;
                case "d":
                //case "ArrowRight":
                    this.action.right = false;
                    break;
                case "e":
                    this.action.special1 = false;
                    break;
                case "q":
                    this.action.special2 = false;
                    break;
            }//switch
        })//event listener key up

    }//constructor

    update() {
    }
}