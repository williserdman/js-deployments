import "./style.css";
import * as THREE from "three";

let camera, scene, renderer;
const startingBoxSize = 3;

const BOXHEIGHT = 1;
let stack = [];

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

  addLayer(0, 0, startingBoxSize, startingBoxSize);
  addLayer(-10, 0, startingBoxSize, startingBoxSize, "x");

  renderer.render(scene, camera);
  document.body.appendChild(renderer.domElement);
}

function addLayer(x, z, width, depth, axis) {
  const y = BOXHEIGHT * stack.length;
  const layer = generateBox(x, y, z, width, depth);
  layer.axis = axis;

  stack.push(layer);
}

function generateBox(x, y, z, width, depth) {
  const geometry = new THREE.BoxBufferGeometry(width, BOXHEIGHT, depth);
  const color = new THREE.Color(`hsl(${30 + stack.length * 4}, 100%, 50%)`);
  const material = new THREE.MeshLambertMaterial({ color: 0xfb8e00 });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  mesh.position.set(x, y, z);
  return { threejs: mesh, width, depth };
}

init();
