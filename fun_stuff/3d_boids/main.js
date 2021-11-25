import * as THREE from "three";
import { Vector2, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Boid from "./Boid";

const SPEED = 0.05;

function createCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.width = canvas.width;
  canvas.style.height = canvas.height;
  canvas.id = "renderScreen";
  document.body.appendChild(canvas);
  return canvas;
}

// Need to make sure that I've got a canvas to do everything on
const canvas = createCanvas();

/****** Start THREE Setup ******/

// Basics: Scene, Camera, and Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaaaaaa);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = -10;
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Adding some lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 100, 0);
const dlHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(ambientLight, directionalLight, dlHelper);

// Allowing easy movement around the scene
const orbitControls = new OrbitControls(camera, renderer.domElement); // domElement is going to be my canvas as I set it earlier

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Borders
// Definitely a better way to do this
const mat = new THREE.MeshBasicMaterial();

//top and bottom
const geo1 = new THREE.BoxBufferGeometry(10, 1, 10);
const side1 = new THREE.Mesh(geo1, mat);
side1.position.y = 5;
const side12 = side1.clone();
side12.position.y = -5;

//x sides
const geo2 = new THREE.BoxBufferGeometry(1, 10, 10);
const side2 = new THREE.Mesh(geo2, mat);
side2.position.x = 5;
const side22 = side2.clone();
side22.position.x = -5;

//z sides
const geo3 = new THREE.BoxBufferGeometry(10, 10, 1);
const side3 = new THREE.Mesh(geo3, mat);
side3.position.z = 5;
const side32 = side3.clone();
side32.position.z = -5;

const SIDES = [side1, side12, side2, side22, side3, side32];
//scene.add(side1, side12, side2, side22, side3, side32);

// Helpers
const simBox = new THREE.Mesh(
  new THREE.BoxBufferGeometry(10, 10, 10),
  new THREE.MeshBasicMaterial({
    color: 0xaa0000,
    wireframe: false,
    side: THREE.DoubleSide
  })
);
const boxHelper = new THREE.BoxHelper(simBox); // added planes above because it takes place insite this box, so ray casting doens't work
const axesHelper = new THREE.AxesHelper(7); // red is x, green is y, so blue is z
const gridHelper = new THREE.GridHelper(10, 20);
scene.add(axesHelper, gridHelper, boxHelper);

/****** End THREE Setup ******/

function createBoids(boidNum) {
  let boidList = [];
  let dirBuffer;
  for (let i = 0; i < boidNum; i++) {
    boidList.push(
      threeBoid(
        Math.random() * 10 - 5, // Having their original position be between -5 and 5 for all axes
        Math.random() * 10 - 5,
        Math.random() * 10 - 5
      )
    );
  }

  return boidList;
}

let temp;
let aHelper;

function boidWander(boid) {
  const WANDER_AMMOUNT = 0.05;
  boid.rotation.x += (Math.random() * 2 * Math.PI - Math.PI) * WANDER_AMMOUNT;
  boid.rotation.y += (Math.random() * 2 * Math.PI - Math.PI) * WANDER_AMMOUNT;
  boid.rotation.z += (Math.random() * 2 * Math.PI - Math.PI) * WANDER_AMMOUNT;
}

const testBoid = new Boid(scene, simBox);

function animate() {
  testBoid.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
