
import * as THREE from "https://cdn.skypack.dev/three@0.134.0";
import EventHandler from "./EventHandler.js";
import GameEngine from "./GameEngine.js";
import CameraController from "./CameraController.js";
import {GLTFLoader} from "./external/GLTFLoader.js";


const FOV = 75;
const NEAR_BOUND = 0.1;
const FAR_BOUND = 5000;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd)
const camera = new THREE.PerspectiveCamera(
    FOV, //field of view
    window.innerWidth / window.innerHeight, //aspect ratio
    NEAR_BOUND, //cloclse ipping bound
    FAR_BOUND //far clipping bound
)

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let canvas = renderer.domElement;
canvas.onclick = () => {
    canvas.requestPointerLock();
    canvas.requestFullscreen();
}

//---------------------
//------- Lights ------
//---------------------
/* const light = new THREE.PointLight(0xc4c4c4, 10) 
light.position.set(10, 20, 10);
scene.add(light);
const light2 = new THREE.PointLight(0xc4c4c4, 10) 
light2.position.set(-10, 20, 10);
scene.add(light2);
const light3 = new THREE.PointLight(0xc4c4c4, 10) 
light3.position.set(-10, 20, -10);
scene.add(light3);
const light4 = new THREE.PointLight(0xc4c4c4, 10) 
light4.position.set(10, 20, -10);
scene.add(light4);
const light5 = new THREE.PointLight(0xc4c4c4, 10) 
light4.position.set(0, 30, 0);
scene.add(light4); */
const light = new THREE.AmbientLight( 0x808080 ); // soft white light
scene.add( light );

const baseGeometry = new THREE.BoxGeometry(100, 2, 100);
const wallGeometry = new THREE.BoxGeometry(100, 10, 2)
const boxGeometry = new THREE.BoxGeometry(2, 2, 2);

const green = new THREE.MeshBasicMaterial({color: 0x00ff00});
const red = new THREE.MeshBasicMaterial({color: 0xff0000});
const blue = new THREE.MeshBasicMaterial({color: 0x0000ff});
const black = new THREE.MeshBasicMaterial({color: 0x000000})

const floor = new THREE.Mesh(baseGeometry, green);
const roof = new THREE.Mesh(baseGeometry, red);
const wall = new THREE.Mesh(wallGeometry, blue);
const wall2 = new THREE.Mesh(wallGeometry, blue);
const box = new THREE.Mesh(boxGeometry, black);

//----------------------------
//------- 3D Models ----------
//----------------------------
const loader = new GLTFLoader();
let beeGLTF;
renderer.outputEncoding = THREE.sRGBEncoding;
loader.load(
    "./3dmodels/bee_best/scene.gltf", (gltf) => { //called when resource is loaded
        //scene.add(gltf.scene);
        beeGLTF = gltf;
    }, (xhr) => { //called while it's being loaded
        console.log((xhr.loaded/xhr.total * 100) + "% loaded");
    }, (e) => console.log("Error: " + e) //called when there are errors
);

let mapGLTF;
renderer.outputEncoding = THREE.sRGBEncoding;
loader.load(
    "./3dmodels/game_pirate_adventure_map/scene.gltf", (gltf) => { //called when resource is loaded
        //scene.add(gltf.scene);
        mapGLTF = gltf;
    }, (xhr) => { //called while it's being loaded
        console.log((xhr.loaded/xhr.total * 100) + "% loaded");
    }, (e) => console.log("Error: " + e) //called when there are errors
);

//function gtlfHasLoaded

roof.position.set(0, 10, 0);
wall.position.set(0, 5, 50);
wall2.position.set(0, 5, -50);
box.position.y = 5;

scene.add(wall2);
scene.add(wall);
scene.add(roof);
scene.add(floor);
scene.add(box);

camera.position.y = 5;

const eventHandler = new EventHandler();
//const game = new GameEngine();
const cameraController = new CameraController(camera);

camera.rotation.set(0, 0, 0, "YXZ")
function animate() {
    cameraController.update(
        eventHandler.mousePosition,
        eventHandler.action,
        eventHandler.doResize,
        renderer
    )

    if (beeGLTF !== undefined) {
        scene.add(beeGLTF.scene);
        beeGLTF.scene.position.y = 20;
    }
    if (mapGLTF !== undefined) {
        mapGLTF.scene.scale.set(0.005, 0.005, 0.005);
        scene.add(mapGLTF.scene);
        mapGLTF.scene.position.y = -50;
        mapGLTF.scene.position.x = 50;
        mapGLTF.scene.position.z = 50;
    }

    box.position.set(camera.position);
    box.rotation.set(camera.rotation);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
