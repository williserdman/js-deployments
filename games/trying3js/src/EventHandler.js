export default class EventHandler {

    constructor() {
        this.mousePosition = {};
        document.addEventListener("mousemove", (e) => {
            this.mousePosition.changeX = e.movementX;
            this.mousePosition.changeY = e.movementY;
        }, false);

        //this.one = 1;
    }

    update() {
    }
}