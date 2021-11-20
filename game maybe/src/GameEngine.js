
import { Engine, Scene, ArcRotateCamera, HemisphericLight, MeshBuilder, Vector3 } from "@babylonjs/core";
import CameraController from "./CameraController";

const STATES = {
    STARTMENU: 1,
    INGAME: 2,
    WINSCREEN: 3,
    LOSESCREEN: 4
}

export default class GameEngine {

    #canvas;
    #engine;
    #scene;
    #gameState;

    constructor() {
        this.#canvas = this.#createCanvas();
        this.#engine = new Engine(this.#canvas, true);
        this.#scene = new Scene(this.#engine);
        this.#gameState = STATES.STARTMENU;

/*         let camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), this.#scene);
        camera.attachControl(this.#canvas, true); */
        new CameraController(this.#scene, this.#canvas)
        let light1 = new HemisphericLight("light1", new Vector3(1, 1, 0), this.#scene);
        let sphere = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, this.#scene);

        this.#engine.runRenderLoop(() => {
            this.#scene.render();
        })
    }// constructor
    #createCanvas() {
        let canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);
        canvas.onclick = () => {
            canvas.requestPointerLock();
        }

        return canvas;
    } //create canvas function
}
