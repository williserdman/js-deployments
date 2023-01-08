import "./style.css";
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let camera, scene, renderer, stats, plane;
async function initThree() {
  scene = new THREE.Scene();
  const texLoader = new THREE.TextureLoader();
  const bgTexture = await texLoader.loadAsync("assets/milky-way-2695569.jpg");
  scene.background = bgTexture;

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  directionalLight.castShadow = true;
  scene.add(ambientLight, directionalLight);

  stats = new Stats();
  document.body.appendChild(stats.domElement);

  plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(300, 300, 256, 256),
    new THREE.MeshLambertMaterial({ color: 0xaaaaaa, wireframe: true })
  );
  plane.rotateX(-Math.PI / 2);
  scene.add(plane);

  camera.position.set(100, 200, -250);
  //camera.lookAt(new THREE.Vector3(0, 0, 0));

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  renderer.domElement.style.outline = "none";
  renderer.domElement.style.border = "none";
  renderer.domElement.style.position = "fixed";
  renderer.domElement.style.top = 0;
  renderer.domElement.style.left = 0;
  document.body.appendChild(renderer.domElement);
  renderer.render(scene, camera);

  const controls = new OrbitControls(camera, renderer.domElement);
}

function makeBump() {
  let vertices = [];
  for (let i = 0; i < plane.geometry.attributes.normal.count; i++) {
    const vertex = new THREE.Vector3().fromBufferAttribute(
      plane.geometry.attributes.position,
      i
    );
    const distance = new THREE.Vector2(vertex.x, vertex.z).distanceTo(
      new THREE.Vector2(0, 0)
    );
    const height =
      1 -
      Math.min(Math.max(distance / plane.geometry.parameters.width, 0.0), 1.0);
    vertex.y = height;
    //plane.geometry.attributes.position. //heres
  }
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  renderer.render(scene, camera);
}

await initThree();
console.log(plane);
renderer.setAnimationLoop(animate);
makeBump();
