
import * as BABYLON from "babylonjs";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const temp = createScene();
const scene = temp.scene;
const sound = temp.sound;
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
    box.position.y = 0.5;

    const ground = new BABYLON.MeshBuilder.CreateGround("ground", {width: 10, height: 10});

    const sound = new BABYLON.Sound("sound", "../assets/sounds/Winchester12-RA_The_Sun_God-1722751268.mp3", scene);
    setInterval(() => sound.play(), 4000);

    return {scene: scene, sound: sound};

}

