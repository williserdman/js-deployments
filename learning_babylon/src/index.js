
import * as BABYLON from "babylonjs";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const scene = createScene();
resizeCanvas();

canvas.onclick = () => {
    canvas.requestPointerLock();
    canvas.requestFullscreen();
}

engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener("resize", () => {
    engine.resize();
    resizeCanvas();
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createScene() {

    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("arcCam", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("hemLight", new BABYLON.Vector3(0, 1, 0));

    const box = new BABYLON.MeshBuilder.CreateBox("box", {});

    return scene;

}

