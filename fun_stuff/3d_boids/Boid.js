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

    this.velocity.add(this.acceleration);
    this.threeBoid.position.add(this.velocity);
    console.log(this.velocity);
    this.acceleration.set(0, 0, 0);
  }
  getDirectionVector() {
    const directionVector = this.velocity.clone();
    return directionVector.normalize();
  }
  #avoidWalls() {
    rayCaster.set(this.threeBoid.position, this.getDirectionVector());
    try {
      const distanceToBorder = rayCaster
        .intersectObject(this.simBox)
        .shift().distance;
      if (distanceToBorder <= 1) {
        this.velocity.multiplyScalar(-1);
      }
    } catch (e) {
      this.velocity.multiplyScalar(-1);
      console.log(rayCaster.intersectObject(this.simBox));
      console.log(this.threeBoid.position);
      console.error(e);
    }
  }
}
