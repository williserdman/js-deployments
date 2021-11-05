
//import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, //field of view
    window.innerWidth / window.innerHeight, //aspect ratio
    0.1, //close clipping bound
    1000 //far clipping bound
);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(2, 2, 2);
const texture = new THREE.TextureLoader().load("textures/crate.gif");
const material = new THREE.MeshBasicMaterial({map: texture});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate(): void {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();