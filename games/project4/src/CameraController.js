import { FreeCamera, FreeCameraKeyboardMoveInput, UniversalCamera, Vector3 } from "@babylonjs/core"

export default class CameraController {

    camera;
    #scene;
    #canvas;

    constructor(scene, canvas) {
        this.#scene = scene;
        this.#canvas = canvas;
        this.camera = this.#createCamera();
    }
    #createCamera() {
        this.camera = new UniversalCamera("camera", new Vector3(0, 0, -10), this.#scene)
        this.camera.setTarget(Vector3.Zero());
        this.camera.attachControl(this.#canvas, true);
        this.camera.inputs.removeByType("FreeCameraKeyboardMoveInput")
        let FreeCameraKeyboardMoveInput = () => {
            console.log(this._keys);
            this._keys = 0;
            this.keysLeft = [65];
            this.keysRight = [68];
        }

        return this.camera;
    }
}


