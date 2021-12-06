import "./style.css";
import * as THREE from "three";
import * as CANNON from "cannon";

let camera: THREE.OrthographicCamera,
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer; // Threejs stuff

let world: CANNON.World;
const startingBoxSize = 3;

const scoreCounter = document.getElementById("score") as HTMLElement;
const restartButton = document.getElementById("reset") as HTMLElement;
restartButton!.onclick = () => restartGame();

const BOXHEIGHT = 1;
let stack: any[] = [];
let overhangs: any[] = [];

function init() {
  gameRunning = false;
  stack = [];
  overhangs = [];
  scoreCounter.textContent = "0";

  // Cannon Stuff
  world = new CANNON.World();
  world.gravity.set(0, -10, 0);
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 40;

  // Three Stuff
  scene = new THREE.Scene();

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(10, 20, 0);
  scene.add(ambientLight, directionalLight);

  const camWidth = 10;
  const camHeight = camWidth * (window.innerHeight / window.innerWidth);
  camera = new THREE.OrthographicCamera(
    camWidth / -2,
    camWidth / 2,
    camHeight / 2,
    camHeight / -2,
    0.1,
    1000
  );
  camera.position.set(4, 4, 4);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Base
  addLayer(0, 0, startingBoxSize, startingBoxSize, "x");

  // First Layer
  addLayer(-10, 0, startingBoxSize, startingBoxSize, "x");

  renderer.render(scene, camera);
  document.body.appendChild(renderer.domElement);
}

function addLayer(
  x: number,
  z: number,
  width: number,
  depth: number,
  axis: string
): void {
  const y = BOXHEIGHT * stack.length;
  const layer = generateBox(x, y, z, width, depth, false);
  layer.axis = axis;

  stack.push(layer);
}

let lastTime: number;
function generateBox(
  x: number,
  y: number,
  z: number,
  width: number,
  depth: number,
  falls: boolean
): any {
  // Threejs
  const geometry = new THREE.BoxBufferGeometry(width, BOXHEIGHT, depth);
  const color = !falls
    ? new THREE.Color(`hsl(${30 + stack.length * 4}, 100%, 50%)`)
    : new THREE.Color(`hsl(${30 + (stack.length - 1) * 4}, 100%, 50%)`);
  const material = new THREE.MeshLambertMaterial({ color, wireframe: false });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  scene.add(mesh);

  // Cannon js
  const shape = new CANNON.Box(
    new CANNON.Vec3(width / 2, BOXHEIGHT / 2, depth / 2) // Cannon js is distance from center, while threejs is just side lengths
  );
  let mass = falls ? 5 : 0; // mass of 0 are unaffected by gravity (but will hold other things)
  mass *= width / startingBoxSize;
  mass *= depth / startingBoxSize;
  const body = new CANNON.Body({ mass, shape });
  body.position.set(x, y, z);
  world.addBody(body);

  return { threejs: mesh, cannonjs: body, width, depth };
}

function animate() {
  if (gameRunning) {
    const speed = 0.15;

    const topLayer: any = stack[stack.length - 1];
    topLayer.threejs.position[topLayer.axis] += speed;
    topLayer.cannonjs.position[topLayer.axis] += speed;

    if (camera.position.y < BOXHEIGHT * (stack.length - 2) + 4) {
      camera.position.y += speed;
    }

    updatePhysics(1 / 60); // this takes in a fraction NOT MILISECONDS
    renderer.render(scene, camera);
  }
}

function updatePhysics(timeDelta: number) {
  world.step(timeDelta);

  overhangs.forEach((overhang) => {
    console.log(overhang.threejs.position);
    overhang.threejs.position.copy(overhang.cannonjs.position);
    console.log(overhang.threejs.position, overhang.cannonjs.position);
    overhang.threejs.quaternion.copy(overhang.cannonjs.quaternion);
  });
}

let gameRunning = false;

function addOverhang(x: number, z: number, width: number, depth: number) {
  const y = BOXHEIGHT * (stack.length - 1);
  const overhang = generateBox(x, y, z, width, depth, true);
  overhangs.push(overhang);
}

function cutBox(topLayer: any, overlap: number, size: number, delta: number) {
  const axis = topLayer.axis;
  const newWidth = axis === "x" ? overlap : topLayer.width;
  const newDepth = axis === "z" ? overlap : topLayer.depth;

  topLayer.width = newWidth;
  topLayer.depth = newDepth;

  topLayer.threejs.scale[axis] = overlap / size; // scale keeps the center the same
  topLayer.threejs.position[axis] -= delta / 2;

  topLayer.cannonjs.position[axis] -= delta / 2;

  const shape = new CANNON.Box(
    new CANNON.Vec3(newWidth / 2, BOXHEIGHT, newDepth / 2)
  );
  topLayer.cannonjs.shapes = [];
  topLayer.cannonjs.addShape(shape);
}

window.addEventListener("click", () => {
  if (!gameRunning) {
    renderer.setAnimationLoop(animate);
    gameRunning = true;
  } else {
    const topLayer: any = stack[stack.length - 1];
    const previousLayer = stack[stack.length - 2];

    const axis = topLayer.axis;

    const delta =
      topLayer.threejs.position[axis] - previousLayer.threejs.position[axis];

    const overhangSize = Math.abs(delta);

    const size = axis === "x" ? topLayer.width : topLayer.depth;

    const overlap = size - overhangSize;

    if (overlap > 0) {
      scoreCounter.textContent = (
        parseInt(scoreCounter!.textContent!) + 1
      ).toString();
      cutBox(topLayer, overlap, size, delta);
      const newWidth = topLayer.width;
      const newDepth = topLayer.depth;

      const overhangShift = (overlap / 2 + overhangSize / 2) * Math.sign(delta);
      const overhangX =
        axis == "x"
          ? topLayer.threejs.position.x + overhangShift
          : topLayer.threejs.position.x;
      const overhangZ =
        axis == "z"
          ? topLayer.threejs.position.z + overhangShift
          : topLayer.threejs.position.z;
      const overhangWidth = axis === "x" ? overhangSize : newWidth;
      const overhangDepth = axis === "z" ? overhangSize : newDepth;

      addOverhang(overhangX, overhangZ, overhangWidth, overhangDepth);

      const nextX = axis === "x" ? topLayer.threejs.position.x : -10;
      const nextZ = axis === "z" ? topLayer.threejs.position.z : -10;
      const nextAxis = axis === "x" ? "z" : "x";

      addLayer(nextX, nextZ, newWidth, newDepth, nextAxis);
    }
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "r") restartGame();
});

function restartGame() {
  renderer.setAnimationLoop(null);
  init();
  gameRunning = false;
}

init();
