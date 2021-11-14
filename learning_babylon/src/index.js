
import * as BABYLON from "babylonjs";
import {SceneLoader} from "babylonjs-loaders";


const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const temp = createScene();
const scene = temp.scene;
const sound = temp.sound;
//const box2 = temp.box2;
resizeCanvas();

canvas.onclick = () => {
    canvas.requestPointerLock();
    canvas.requestFullscreen();
}

engine.runRenderLoop(() => {
    scene.render();
    //box2.rotation.y += BABYLON.Tools.ToRadians(1)
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

/*     const box = new BABYLON.MeshBuilder.CreateBox("box", {});
    const boxMat = new BABYLON.StandardMaterial("boxMat", scene);
    boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg", scene);
    box.position.y = 0.5;
    box.material = boxMat; */
    //OR can be set with a vector

/*     const box2 = new BABYLON.MeshBuilder.CreateBox("box2", {width: 2, height: 1.5, depth: 3})
    box2.position = new BABYLON.Vector3(2, 0.75, 2); */
    //OR you can: box2.scaling = new BABYLON.Vector3(2, 1.5, 3);

/*     const ground = new BABYLON.MeshBuilder.CreateGround("ground", {width: 10, height: 10});
    const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
    ground.material = groundMat; */

    SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "village.glb", scene);

    const sound = new BABYLON.Sound("sound", "../assets/sounds/Winchester12-RA_The_Sun_God-1722751268.mp3", scene);
    //setInterval(() => sound.play(), 4000);

    return {scene: scene, sound: sound};

}

