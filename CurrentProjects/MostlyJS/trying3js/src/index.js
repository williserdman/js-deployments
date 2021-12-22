

import * as THREE from "https://cdn.skypack.dev/three@0.134.0";
import EventHandler from "./EventHandler.js";
import GameEngine from "./GameEngine.js";
import CameraController from "./CameraController.js";
import {GLTFLoader} from "./external/GLTFLoader.js";
import * as Ammo from "./external/ammo.js";


const FOV = 75;
const NEAR_BOUND = 0.1;
const FAR_BOUND = 5000;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020)
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

//----------------------
//-------- Physics -----
//----------------------

//initialize physics
/* const physics = new AmmoPhysics(scene);
physics.debug.enable(true);

//add a ground 
physics.add.ground({width: 20, height: 20}) */


//---------------------
//------- Lights ------
//---------------------
const light = new THREE.AmbientLight( 0x101010 ); // soft white light
//everything gets an equal ammount of light with ambient light, so no shadows
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(50, 500, 50);
scene.add(directionalLight);
scene.add(directionalLight.target);
directionalLight.castShadow = true;


//----------------------------
//------- 3D Models ----------
//----------------------------
const loader = new GLTFLoader();
let beeGLTF;
renderer.outputEncoding = THREE.sRGBEncoding;
loader.load(
    "./3dmodels/bee_best/scene.gltf", (gltf) => { //called when resource is loaded
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

// ---------------------------------

/* const baseGeometry = new THREE.BoxGeometry(100, 2, 100);
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

roof.position.set(0, 10, 0);
wall.position.set(0, 5, 50);
wall2.position.set(0, 5, -50);
box.position.y = 5;

scene.add(wall2);
scene.add(wall);
scene.add(roof);
scene.add(floor); */

const boxGeometry = new THREE.BoxGeometry(100, 100, 100);
const playerGeometry = new THREE.BoxGeometry(4, 8, 4)
const white = new THREE.MeshBasicMaterial({color: 0xffffff});
const box = new THREE.Mesh(boxGeometry, white);
const player = new THREE.Mesh(playerGeometry, white);
scene.add(box);
scene.add(player);

const eventHandler = new EventHandler();
const cameraController = new CameraController(camera);

camera.rotation.set(0, 0, 0, "YXZ");
function animate() {
    cameraController.update(
        eventHandler.mousePosition,
        eventHandler.action,
        eventHandler.doResize,
        renderer
    )
    
    //could have something orbit around the light to get a day/night cycle
    directionalLight.target.position.set(camera.position.x, camera.position.y, camera.position.z);
    directionalLight.position.set(camera.position.x, camera.position.y + 3000, camera.position.z);
    box.position.set(camera.position.x, camera.position.y + 3000, camera.position.z)
    scene.add(directionalLight.target);
    player.position.set(camera.position.x, camera.position.y + 4, camera.position.z);

    if (beeGLTF !== undefined) {
        scene.add(beeGLTF.scene);
        beeGLTF.scene.position.y = 20;
    }
    if (mapGLTF !== undefined) {
        mapGLTF.scene.scale.set(0.02, 0.02, 0.02);
        scene.add(mapGLTF.scene);
        mapGLTF.scene.position.y = -50;
        mapGLTF.scene.position.x = 50;
        mapGLTF.scene.position.z = 50;
    }

    //box.position.set(camera.position);
    //box.rotation.set(camera.rotation);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
