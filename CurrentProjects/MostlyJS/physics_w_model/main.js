import "./style.css";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import Stats from "three/examples/jsm/libs/stats.module";
import { PointerLockControlsCannon } from "cannon-es/examples/js/PointerLockControlsCannon";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

//https://github.com/pmndrs/cannon-es/blob/master/examples/threejs_fps.html

const loader = new GLTFLoader();
let sceneGLTF;

// threejs things
let scene, camera, renderer, stats, material;

// cannonjs stuff
let world, controls;
const timeStep = 1 / 60; // in seconds not millisenconds
let lastCallTime = performance.now();
let sphereShape, sphereBody, physicsMaterial;
const ballBodies = [];
const ballMeshes = [];
const boxBodies = [];
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
  spotlight.shadow.bias = -0.002;
  spotlight.position.set(10, 30, 20);
  spotlight.target.position.set(0, 0, 0);
  spotlight.castShadow = true;
  spotlight.shadow.camera.near = 10;
  spotlight.shadow.camera.far = 100;
  spotlight.shadow.camera.fov = 30;
  spotlight.shadow.mapSize.width = 2048;
  spotlight.shadow.mapSize.height = 2048;
  const spotlightHelper = new THREE.SpotLightHelper(spotlight);
  scene.add(ambientLight, spotlight);

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

  sphereShape = new CANNON.Sphere(1.3); // 1 is the radius
  sphereBody = new CANNON.Body({
    mass: 72,
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

  createBoxes();
}

const shootVelocity = 15;
const ballShape = new CANNON.Sphere(0.2);
const ballGeometry = new THREE.SphereBufferGeometry(ballShape.radius, 32, 32);

function getShootDirection() {
  const vector = new THREE.Vector3(0, 0, 1);
  vector.unproject(camera);
  const ray = new THREE.Ray(
    sphereBody.position,
    vector.sub(sphereBody.position).normalize()
  );
  return ray.direction;
}

window.addEventListener("click", (e) => {
  if (!controls.enabled) {
    controls.lock();
    console.log("controls locked");
    controls.enabled = true;
    return;
  }

  const ballBody = new CANNON.Body({ mass: 1, shape: ballShape });
  const ballMesh = new THREE.Mesh(ballGeometry, material);

  ballMesh.castShadow = true;
  ballMesh.receiveShadow = true;

  world.addBody(ballBody);
  scene.add(ballMesh);
  ballBodies.push(ballBody);
  ballMeshes.push(ballMesh);

  const shootDirection = getShootDirection();
  ballBody.velocity.set(
    shootDirection.x * shootVelocity,
    shootDirection.y * shootVelocity,
    shootDirection.z * shootVelocity
  );

  const x =
    sphereBody.position.x +
    shootDirection.x * (sphereShape.radius * 1.02 + ballShape.radius);
  const y =
    sphereBody.position.y +
    shootDirection.y * (sphereShape.radius * 1.02 + ballShape.radius);
  const z =
    sphereBody.position.z +
    shootDirection.z * (sphereShape.radius * 1.02 + ballShape.radius);
  ballBody.position.set(x, y, z);
  ballMesh.position.copy(ballBody.position);
});

function initPointerLock() {
  controls = new PointerLockControlsCannon(camera, sphereBody);
  scene.add(controls.getObject());
}

function createBoxes() {
  const cannonBox = new CANNON.Vec3(1, 1, 1);
  const boxShape = new CANNON.Box(cannonBox);
  //const boxGeometry = new THREE.BoxBufferGeometry(cannonBox.scale(2));
  const boxGeometry = new THREE.BoxBufferGeometry(
    cannonBox.x * 2,
    cannonBox.y * 2,
    cannonBox.z * 2
  );

  for (let i = 0; i < 7; i++) {
    const boxBody = new CANNON.Body({ mass: 5, shape: boxShape });
    const boxMesh = new THREE.Mesh(boxGeometry, material);
    boxMesh.castShadow = true;
    boxMesh.receiveShadow = true;

    const x = (Math.random() - 0.5) * 20;
    const y = (Math.random() - 0.5) * 1 + 1;
    const z = (Math.random() - 0.5) * 20;

    boxBody.position.set(x, y, z);
    boxMesh.position.copy(boxBody.position);

    world.addBody(boxBody);
    scene.add(boxMesh);
    boxBodies.push(boxBody);
    boxMeshes.push(boxMesh);
  }
}

function createLinkedBoxes() {
  const size = 0.5; // side lengths i assume
  const mass = 0.3;
  const space = 0.1 * size; // gap
}

/* console.log(1);
loader.load(
  "./assets/3dmodels/red_car_wreck/scene.gltf",
  (gltf) => {
    console.log(2);
    sceneGLTF = gltf;
  },
  (progress) => {
    console.log((progress.loaded / progress.total) * 100 + "% loaded");
  },
  (e) => {
    console.log(`Error: ${e}`);
  }
);
console.log(3); */

const loaderPromise = loader.loadAsync(
  "./assets/3dmodels/red_car_wreck/scene.gltf",
  (progress) => {
    console.log((progress.loaded / progress.total) * 100 + "% loaded");
  }
);

loaderPromise
  .then((gltf) => {
    sceneGLTF = gltf.scene;
    sceneGLTF.position.set(0, 1, 0);
    scene.add(sceneGLTF);
  })
  .catch((e) => console.log(e));

threeInit(); // scene is made here and used in both
cannonInit();
initPointerLock();

// cannon js doesn't hace ccd which means tunneling is ok

function animate() {
  requestAnimationFrame(animate);
  const time = performance.now() / 1000;
  const dt = time - lastCallTime;
  lastCallTime = time;

  if (controls.enabled) {
    world.step(timeStep, dt);

    for (let i = 0; i < ballBodies.length; i++) {
      ballMeshes[i].position.copy(ballBodies[i].position);
      ballMeshes[i].quaternion.copy(ballBodies[i].quaternion);
    }
    for (let i = 0; i < boxBodies.length; i++) {
      boxMeshes[i].position.copy(boxBodies[i].position);
      boxMeshes[i].quaternion.copy(boxBodies[i].quaternion);
    }
  }
  controls.update(dt);
  renderer.render(scene, camera);
  stats.update();
}

animate();
