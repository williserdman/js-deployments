
import { ArcRotateCamera, Color4, Engine, FreeCamera, HemisphericLight, Mesh, MeshBuilder, Scene, Vector3 } from "https://cdn.babylonjs.com/babylon.js";
import { AdvancedDynamicTexture, Button, Control } from "@babylonjs/gui";

enum State { START = 0, GAME = 1, LOSE = 2, CUTSCENE = 3 };

class App {
    
    private _scene: Scene;
    private _canvas: HTMLCanvasElement;
    private _engine: Engine;

    private _state: number = 0;

    constructor() {
        this._canvas = this._createCanvas();

        // initializing babylon
        this._engine = new Engine(this._canvas, true);
        this._scene = new Scene(this._engine);
        //this._gotoStart();
        const camera: ArcRotateCamera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), this._scene);
        camera.attachControl(this._canvas, true);

        const hemiLight1: HemisphericLight = new HemisphericLight("hemiLight1", new Vector3(1, 1, 0), this._scene);
        const sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, this._scene);
        
        window.addEventListener("keydown", (e) => {
            if (e.shiftKey && e.ctrlKey && e.altKey && e.key === 'i') {
                if (this._scene.debugLayer.isVisible()) {
                    this._scene.debugLayer.hide();
                } else {
                    this._scene.debugLayer.show();
                }
            }
        });

        this._engine.runRenderLoop(() => {
            this._scene.render();
        });
        
    }
    private _createCanvas(): HTMLCanvasElement {
        this._canvas = document.createElement("canvas");
        this._canvas.style.width = "100%";
        this._canvas.style.height = "100%";
        // creating the canvas here so that the code will always have access to it. Then making sure that it's as large as is allowed
        this._canvas.id = "gameCanvas";
        document.body.appendChild(this._canvas);
        return this._canvas;
    }
    private async _goToStart(): Promise<void> {
        this._engine.displayLoadingUI();
        this._scene.detachControl();
        const scene = new Scene(this._engine);
        scene.clearColor = new Color4(0, 0, 0, 1);
        const freeCam = new FreeCamera("freeCam", new Vector3(0, 0, 0), scene);
        freeCam.setTarget(Vector3.Zero());

        const guiMenu = AdvancedDynamicTexture.CreateFullscreenUI("UI");

        const startButton = Button.CreateSimpleButton("start", "PLAY");
        startButton.width = 0.2;
        startButton.height = "40px";
        startButton.color = "white";
        startButton.top = "-14px";
        startButton.thickness = 0;
        startButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        guiMenu.addControl(startButton);

        startButton.onPointerDownObservable.add( () => {
            //this._goToCutscene();
            scene.detachControl();
        })


        await scene.whenReadyAsync();
        this._engine.hideLoadingUI();
        this._scene.dispose();
        this._scene = scene;
        this._state = State.START;
    }
    private async _goToLose(): Promise<void> {
        this._engine.displayLoadingUI();

        this._scene.detachControl();
        let scene = new Scene(this._engine);
        scene.clearColor = new Color4(0, 0, 0, 1);
        let camera = new FreeCamera("camera1", new Vector3(0, 0, 0), scene);
        camera.setTarget(Vector3.Zero());

        const guiMenu = AdvancedDynamicTexture.CreateFullscreenUI("UI");
        const mainBtn = Button.CreateSimpleButton("mainmenu", "MAIN MENU");
        mainBtn.width = 0.2;
        mainBtn.height = "40px";
        mainBtn.color = "white";
        guiMenu.addControl(mainBtn);
        //this handles interactions with the start button attached to the scene
        mainBtn.onPointerUpObservable.add(() => {
            this._goToStart();
        });

        await scene.whenReadyAsync();
        this._engine.hideLoadingUI();
        this._scene.dispose();
        this._scene = scene;
        this._state = State.LOSE;
    }
    private async _goToCutscene() {
        
    }
}

new App();
