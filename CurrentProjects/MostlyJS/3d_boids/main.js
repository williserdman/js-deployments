import * as THREE from "https://cdn.skypack.dev/three@0.132.2";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";

import Boid from "./Boid";

const SPEED = 0.05;

function getScreen(id) {
  const canvas = document.getElementById(id);
  canvas.width = window.innerWidth / 2;
  canvas.height = window.innerHeight / 2;
  canvas.style.width = canvas.width;
  canvas.style.height = canvas.height;
  return canvas;
}

// Need to make sure that I've got a canvas to do everything on
const canvas = getScreen("renderScreen");
const canvas2 = getScreen("secondScreen");

/****** Start THREE Setup ******/

// Basics: Scene, Camera, and Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaaaaaa);
const camera = new THREE.PerspectiveCamera(
  75,
  canvas.width / canvas.height,
  0.1,
  1000
);
camera.position.z = -50;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

const renderer2 = new THREE.WebGLRenderer({
  canvas: canvas2
});
renderer2.setSize(window.innerWidth / 2, window.innerHeight / 2);

// Adding some lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 100, 0);
const dlHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(ambientLight, directionalLight);

// Allowing easy movement around the scene
const orbitControls = new OrbitControls(camera, renderer.domElement); // domElement is going to be my canvas as I set it earlier

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer2.setSize(window.innerWidth / 2, window.innerHeight / 2);
  camera2.aspect = window.innerWidth / window.innerHeight;
  camera2.updateProjectionMatrix();
});

// Helpers
const simBox = new THREE.Mesh(
  new THREE.BoxBufferGeometry(100, 100, 100),
  new THREE.MeshBasicMaterial({
    color: 0xaa0000,
    wireframe: false,
    side: THREE.DoubleSide
  })
);
const boxHelper = new THREE.BoxHelper(simBox); // added planes above because it takes place insite this box, so ray casting doens't work
const axesHelper = new THREE.AxesHelper(7); // red is x, green is y, so blue is z
const gridHelper = new THREE.GridHelper(10, 20);
//scene.add(axesHelper, gridHelper, boxHelper);
/****** End THREE Setup ******/

const camera2 = new THREE.PerspectiveCamera(
  75,
  canvas2.width / canvas2.height,
  0.1,
  1000
);

const controls2 = new OrbitControls(camera2, renderer2.domElement);

const cameraBoid = new Boid(scene);

const BOIDNUM = 666;
let boids = [];
for (let i = 0; i < BOIDNUM; i++) boids.push(new Boid(scene));

function animate() {
  cameraBoid.update(boids);
  camera2.position.copy(cameraBoid.threeBoid.position);
  camera2.rotation.setFromVector3(cameraBoid.getDirectionVector());

  boids.forEach((boid) => boid.update(boids));
  renderer.render(scene, camera);
  renderer2.render(scene, camera2);
  requestAnimationFrame(animate);
}

window.onload = animate;
