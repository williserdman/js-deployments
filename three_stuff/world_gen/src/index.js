
import * as THREE from "three";
import FirstPersonControls from "../node_modules/three/examples/js/controls/FirstPersonControls.js";

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
camera.position.z = 5

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const canvas = renderer.domElement;
canvas.onclick = () => {
    canvas.requestPointerLock();
}

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const box = new THREE.Mesh(
    new THREE.BoxBufferGeometry(2, 2, 2),
    new THREE.MeshLambertMaterial({ color: 0x00ff00 })
);
scene.add(box);

const controls = new FirstPersonControls(camera, canvas);


function run() {    
    renderer.render(scene, camera);
    requestAnimationFrame(run);
}
run();
