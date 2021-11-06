
import * as THREE from "https://cdn.skypack.dev/three@0.134.0";
import EventHandler from "./EventHandler.js";

const FOV = 75;
const NEAR_BOUND = 0.1;
const FAR_BOUND = 1000;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    FOV, //field of view
    window.innerWidth/window.innerHeight, //aspect ratio
    NEAR_BOUND, //close clipping bound
    FAR_BOUND //far clipping bound
)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5

let buffer;
const events = new EventHandler();
function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    buffer = camera.rotation.y;
    camera.rotation.y += (events.mousePosition.changeX / window.innerWidth) * 2*Math.PI;
    if (isNaN(camera.rotation.y)) camera.rotation.y = buffer;

    buffer = camera.rotation.x;
    camera.rotation.x += (events.mousePosition.changeY / window.innerHeight) * 2*Math.PI;
    if (isNaN(camera.rotation.x)) camera.rotation.x = buffer;

}

animate();
