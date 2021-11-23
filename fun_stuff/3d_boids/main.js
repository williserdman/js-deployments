import * as THREE from "https://cdn.skypack.dev/three";
import { OrbitControls } from "https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls";

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
  new THREE.MeshBasicMaterial({ wireframe: true })
);
const boxHelper = new THREE.BoxHelper(simBox); // added planes above because it takes place insite this box, so ray casting doens't work
const axesHelper = new THREE.AxesHelper(7); // red is x, green is y, so blue is z
const gridHelper = new THREE.GridHelper(10, 20);
scene.add(axesHelper, gridHelper, boxHelper);

/****** End THREE Setup ******/

function threeBoid(posX, posY, posZ) {
  const boid = new THREE.Mesh(
    new THREE.CylinderBufferGeometry(0, 0.1, 0.3), // this should be a cone coming to a point at the top
    new THREE.MeshStandardMaterial({ color: 0x00aa00 })
  );
  boid.position.set(posX, posY, posZ);
  scene.add(boid);
  return boid;
}

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

function getDistance(boid1, boid2) {
  return Math.sqrt(
    (boid2.position.x - boid1.position.x) ** 2 +
      (boid2.position.y - boid1.position.y) ** 2 +
      (boid2.position.z - boid1.position.z) ** 2
  );
}

function updateBoid(boid) {
  boid.translateY(SPEED);
}

let temp;
let aHelper;
function getDirVec(boid) {
  testBoid.getWorldDirection(vec);
  //this is the Z axis' movement forward
  //i want to move the y axis forward

  scene.remove(aHelper);
  aHelper = new THREE.ArrowHelper(vec, boid.position, 3);
  scene.add(aHelper);

  return vec;
}

//rayCaster.far = 100;
let ghostScene;
function distanceToObstacle(boid) {
  ghostScene = scene;
  SIDES.forEach((a) => ghostScene.add(a));
  ghostScene.updateMatrixWorld(true);
  let rayCaster = new THREE.Raycaster(boid.position, getDirVec(boid), 0, 33);
  const dafda = rayCaster.intersectObjects(SIDES);
  try {
    return console.log(dafda[0].distance);
  } catch {
    return 0;
  }
}

function avoidWalls(boid) {
  if (distanceToObstacle(boid) <= 1) {
    boid.rotation.x += Math.random() * 2 * Math.PI - Math.PI;
    boid.rotation.y += Math.random() * 2 * Math.PI - Math.PI;
    boid.rotation.z += Math.random() * 2 * Math.PI - Math.PI;
    console.log("fired");
  }
  console.log("called");
}

function boidWander(boid) {
  const WANDER_AMMOUNT = 0.05;
  boid.rotation.x += (Math.random() * 2 * Math.PI - Math.PI) * WANDER_AMMOUNT;
  boid.rotation.y += (Math.random() * 2 * Math.PI - Math.PI) * WANDER_AMMOUNT;
  boid.rotation.z += (Math.random() * 2 * Math.PI - Math.PI) * WANDER_AMMOUNT;
}

const testBoid = new threeBoid(-3, -6, 0);
testBoid.rotation.x = 1;

let vec = new THREE.Vector3(0, 0, 0);
function animate() {
  avoidWalls(testBoid);
  updateBoid(testBoid);
  SIDES.forEach((a) => scene.remove(a));
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
