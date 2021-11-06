
import * as THREE from "https://cdn.skypack.dev/three@0.134.0";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, //field of view
    window.innerWidth/window.innerHeight, //aspect ratio
    0.1, //close clipping bound
    1000 //far clipping bound
)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}

animate();
