import { ArcRotateCamera, Engine, Scene, Vector3, HemisphericLight, MeshBuilder } from "@babylonjs/core";

const canvas = createCanvas();
const engine = new Engine(canvas, true);
const scene = new Scene(engine);
const camera = new ArcRotateCamera("camera", 1, 2, 20, new Vector3(0, 0, 0), scene);
const light0 = new HemisphericLight("light0", new Vector3(0, 0, 10), scene);
const ground = MeshBuilder.CreateBox("gound", { size: 50 }, scene);
ground.position.y = -10
ground.scaling.y = 0.1



scene.activeCamera.attachControl(canvas, true);

engine.runRenderLoop(() => {
    scene.render();
})

function createCanvas() {
    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.id = "gameCanvas";
    document.body.appendChild(canvas);
    return canvas;
}

