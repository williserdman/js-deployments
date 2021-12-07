import "./style.css";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import Stats from "three/examples/jsm/libs/stats.module";
import { PointerLockControlsCannon } from "cannon-es/examples/js/PointerLockControlsCannon";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// threejs things
let scene, camera, renderer, stats, material;

// cannonjs stuff
let world, contrls;
const timeStep = 1 / 60; // in seconds not millisenconds
let lastCallTime = performance.now();
let sphereShape, sphereBody, physicsMaterial;
const balls = [];
const ballMeshes = [];
const boxes = [];
const boxMeshes = [];

function threeInit() {
  scene = new THREE.Scene();
  // scene.fog(0x000000, 0, 500); // not sure what this does

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setClearColor(scene.fog.color); // not sure what clear color is

  renderer.shadowMap.enabled = true; // not sure what shadowmap is
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // one of four types of shadow maps

  document.body.appendChild(renderer.domElement);

  // lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  const spotlight = new THREE.SpotLight(0xffffff, 0.9, 0, Math.PI / 4, 1);
  spotlight.position.set(10, 30, 20);
  spotlight.target.position.set(0, 0, 0);
  spotlight.castShadow = true;
  spotlight.shadow.camera.near = 10;
  spotlight.shadow.camera.far = 100;
  spotlight.shadow.camera.fov = 30;
  spotlight.shadow.mapSize.width = 2048;
  spotlight.shadow.mapSize.height = 2048;
  scene.add(spotlight);

  material = new THREE.MeshLambertMaterial({
    color: 0xdddddd,
    side: THREE.DoubleSide
  }); // generic grey material

  const ground = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(300, 300, 100, 100),
    material
  );
  ground.rotateX(-Math.PI / 2);
  ground.receiveShadow = true;
  scene.add(ground);

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // having stats visible
  stats = new Stats();
  document.body.appendChild(stats.domElement); // maybe just stats.dom, not sure what the difference is
}

function cannonInit() {
  world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.81, 0) });

  world.defaultContactMaterial.contactEquationStiffness = 1e9; // no damn clue what this does
  world.defaultContactMaterial.contactEquationRelaxation = 4; // again

  const solver = new CANNON.GSSolver(); // not sure what a solver is
  solver.iterations = 7;
  solver.tolerance = 0.1;
  world.solver = new CANNON.SplitSolver(solver); // what is a split solver?
  // world.solver = solver // this would be a non-split solver

  physicsMaterial = new CANNON.Material("physics"); // what is a physics material?
  const contactMaterial = new CANNON.ContactMaterial(
    physicsMaterial,
    physicsMaterial,
    { friction: 0, restitution: 0.3 }
  ); // what??

  world.addContactMaterial(contactMaterial);

  sphereShape = new CANNON.Sphere(1); // 1 is the radius
  sphereBody = new CANNON.Body({
    mass: 5,
    material: physicsMaterial,
    shape: sphereShape
  });
  // sphereBody.addShape(sphereShape); // it's like the geometry of a threejs mesh
  sphereBody.position.set(0, 5, 0);
  sphereBody.linearDamping = 0.9; // not sure....
  world.addBody(sphereBody);

  const groundShape = new CANNON.Plane();
  const groundBody = new CANNON.Body({
    mass: 0,
    material: physicsMaterial,
    shape: groundShape
  });
  groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  world.addBody(groundBody);
}

cannonInit();
threeInit();

const controls = new OrbitControls(camera, renderer.domElement);
renderer.setAnimationLoop(animate);

function animate() {
  renderer.render(scene, camera);
}
