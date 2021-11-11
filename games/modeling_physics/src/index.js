
import * as THREE from "three";
import * as CANNON from "cannon";

let camera, scene, renderer;

function init() {
    scene = new THREE.Scene()

    const geometry = new THREE.BoxGeometry(3, 1, 3);
    const material = new THREE.MeshLambertMaterial({color: 0x008000});
    const mesh = new THREE.Mesh(geometry, material);
    //mesh.position.set(0, 0, 0);
    scene.add(mesh);

    const ambientLight = new THREE.AmbientLight(0x999999, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x808080, 1);
    directionalLight.position.set(0, 40, 0);
    scene.add(directionalLight);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 5000);
    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);

    document.body.appendChild(renderer.domElement);
}

let world;
function cannonInit() {
    world = new CANNON.World();
    world.gravity.set(0, -10, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 40;


}

init();


