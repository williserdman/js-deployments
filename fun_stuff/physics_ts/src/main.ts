import "./style.css";
import * as THREE from "three";

let camera: THREE.OrthographicCamera,
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer;
const startingBoxSize = 3;

const BOXHEIGHT = 1;
let stack: any[] = [];

function init() {
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
  const layer = generateBox(x, y, z, width, depth);
  layer.axis = axis;

  stack.push(layer);
}

function generateBox(
  x: number,
  y: number,
  z: number,
  width: number,
  depth: number
): any {
  const geometry = new THREE.BoxBufferGeometry(width, BOXHEIGHT, depth);
  const color = new THREE.Color(`hsl(${30 + stack.length * 4}, 100%, 50%)`);
  const material = new THREE.MeshLambertMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  mesh.position.set(x, y, z);
  return { threejs: mesh, width, depth };
}

function animate() {
  const speed = 0.15;

  const topLayer: any = stack[stack.length - 1];
  topLayer.threejs.position[topLayer.axis] += speed;

  if (camera.position.y < BOXHEIGHT * (stack.length - 2) + 4) {
    camera.position.y += speed;
  }

  renderer.render(scene, camera);
}

let gameRunning = false;

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
      const newWidth = axis === "x" ? overlap : topLayer.width;
      const newDepth = axis === "z" ? overlap : topLayer.depth;

      topLayer.width = newWidth;
      topLayer.depth = newDepth;

      topLayer.threejs.scale[axis] = overlap / size; // scale keeps the center the same
      topLayer.threejs.position[axis] -= delta / 2;

      const nextX = axis === "x" ? topLayer.threejs.position.x : -10;
      const nextZ = axis === "z" ? topLayer.threejs.position.z : -10;
      const nextAxis = axis === "x" ? "z" : "x";

      addLayer(nextX, nextZ, newWidth, newDepth, nextAxis);
    }
  }
});

init();
