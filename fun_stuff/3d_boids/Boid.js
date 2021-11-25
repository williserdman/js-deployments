import * as THREE from "three";

const sphereGeometry = new THREE.SphereBufferGeometry(0.1);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x00aa00 });
const rayCaster = new THREE.Raycaster(
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, 0),
  0.1,
  1000
);

export default class Boid {
  constructor(scene, simBox) {
    this.scene = scene;
    this.velocity = new THREE.Vector3(0.05, 0.05, 0.05);
    this.acceleration = new THREE.Vector3(0, 0, 0);
    this.simBox = simBox;
    this.mass = 0.001;

    // Creating three.js item
    this.threeBoid = new THREE.Mesh(sphereGeometry, sphereMaterial);
    this.threeBoid.position.set(
      Math.random() * 8 - 4,
      Math.random() * 8 - 4,
      Math.random() * 8 - 4
    );

    this.scene.add(this.threeBoid);
  }
  getDistance(otherBoid) {
    return Math.sqrt(
      (otherBoid.position.x - this.threeBoid.position.x) ** 2 +
        (otherBoid.position.y - this.threeBoid.position.y) ** 2 +
        (otherBoid.position.z - this.threeBoid.position.z) ** 2
    );
  }
  update() {
    this.#avoidWalls();

    this.acceleration.multiplyScalar(this.mass);
    this.velocity.add(this.acceleration);
    this.velocity.clampLength(0, 0.3);
    this.threeBoid.position.add(this.velocity);
    this.acceleration.set(0, 0, 0);
  }
  getDirectionVector() {
    const directionVector = this.velocity.clone();
    return directionVector.normalize();
  }
  #avoidWalls() {
    const SIZE = 4;
    const TURNFACTOR = 1;
    /* rayCaster.set(this.threeBoid.position, this.getDirectionVector());
    try {
      const distanceToBorder = rayCaster
        .intersectObject(this.simBox)
        .shift().distance;
      if (distanceToBorder <= 1) {
        this.velocity.multiplyScalar(-1); //PROBABLY BETTER JUST TO CHECK EACH INDIVIDUALLY AND ADJUST EACH INDIVIDUALLY
      }
    } catch (e) {
      this.velocity.multiplyScalar(-1);
      console.log(rayCaster.intersectObject(this.simBox));
      console.log(this.threeBoid.position);
      console.error(e);
    } */
    if (this.threeBoid.position.x >= SIZE) this.acceleration.x -= TURNFACTOR;
    if (this.threeBoid.position.x <= -SIZE) this.acceleration.x += TURNFACTOR;
    if (this.threeBoid.position.y >= SIZE) this.acceleration.y -= TURNFACTOR;
    if (this.threeBoid.position.y <= -SIZE) this.acceleration.y += TURNFACTOR;
    if (this.threeBoid.position.z >= SIZE) this.acceleration.z -= TURNFACTOR;
    if (this.threeBoid.position.z <= -SIZE) this.acceleration.z += TURNFACTOR;
  }
}
