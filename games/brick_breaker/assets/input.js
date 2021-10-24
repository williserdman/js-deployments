import Game from "./game.js";

export default class InputHandler {
    constructor(paddle, game) {
        document.addEventListener("keydown", (Event) => {
            //alert(Event.key)

            switch (Event.key) {
                case "ArrowLeft":
                    //alert("move left");
                    paddle.moveLeft();
                    break;
                case "ArrowRight":
                    //alert("move right");
                    paddle.moveRight();
                    break;
                case "Escape":
                    game.toggle_pause();
                    break;
                case " "://spacebar
                    game.start();
                    break;
            }
        }) //keydown

        document.addEventListener("keyup", (Event) => {
            //alert(Event.key)

            switch (Event.key) {
                case "ArrowLeft":
                    //alert("move left");
                    if (paddle.speed < 0) {paddle.stop()};
                    break;
                case "ArrowRight":
                    //alert("move right");
                    if (paddle.speed > 0) {paddle.stop()};
                    break;
            }
        })//keyup
    }
}
