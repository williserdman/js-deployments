import * as THREE from "three";

const sphereGeometry = new THREE.SphereBufferGeometry(0.5);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x00aa00 });
const rayCaster = new THREE.Raycaster(
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, 0),
  0.1,
  1000
);

export default class Boid {
  constructor(scene) {
    this.scene = scene;
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.acceleration = new THREE.Vector3(
      Math.random() * 40 - 20,
      Math.random() * 40 - 20,
      Math.random() * 40 - 20
    );
    this.mass = 0.1;

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
      (otherBoid.threeBoid.position.x - this.threeBoid.position.x) ** 2 +
        (otherBoid.threeBoid.position.y - this.threeBoid.position.y) ** 2 +
        (otherBoid.threeBoid.position.z - this.threeBoid.position.z) ** 2
    );
  }
  getPosition() {
    return this.threeBoid.position;
  }
  update(boidList) {
    this.#avoidWalls();
    this.#matchDirection(boidList);
    this.#goToCenter(boidList);
    this.#avoidOthers(boidList);

    this.acceleration.multiplyScalar(this.mass);
    this.velocity.add(this.acceleration);
    this.velocity.clampLength(0, 1);
    this.threeBoid.position.add(this.velocity);
    this.acceleration.set(0, 0, 0);
  }
  getDirectionVector() {
    const directionVector = this.velocity.clone();
    return directionVector.normalize();
  }
  #avoidWalls() {
    const SIZE = 40;
    const TURNFACTOR = 1;
    if (this.threeBoid.position.x >= SIZE) this.acceleration.x -= TURNFACTOR;
    if (this.threeBoid.position.x <= -SIZE) this.acceleration.x += TURNFACTOR;
    if (this.threeBoid.position.y >= SIZE) this.acceleration.y -= TURNFACTOR;
    if (this.threeBoid.position.y <= -SIZE) this.acceleration.y += TURNFACTOR;
    if (this.threeBoid.position.z >= SIZE) this.acceleration.z -= TURNFACTOR;
    if (this.threeBoid.position.z <= -SIZE) this.acceleration.z += TURNFACTOR;
  }
  #avoidOthers(boidList) {
    const VIEWDISTANCE = 10;
    const AVOIDFACTOR = 0.03;
    let change = new THREE.Vector3();
    let buffer = new THREE.Vector3();
    let counter = 0;
    for (let otherBoid of boidList) {
      if (otherBoid !== this) {
        let distance = this.getDistance(otherBoid);
        if (distance <= VIEWDISTANCE) {
          buffer = this.threeBoid.position.clone();
          buffer
            .sub(otherBoid.threeBoid.position)
            .divideScalar(distance)
            .multiplyScalar(VIEWDISTANCE);
          change.add(buffer);
          counter++;
        }
      }
    }
    if (counter) {
      change.multiplyScalar(AVOIDFACTOR);
      this.acceleration.add(change);
    }
  }
  #matchDirection(boidList) {
    const MATCHAMMOUNT = 1;
    const VIEWDISTANCE = 20;
    let counter = 0;
    let averageVelocity = new THREE.Vector3(0, 0, 0);
    for (let otherBoid of boidList) {
      if (otherBoid !== this) {
        if (this.getDistance(otherBoid) <= VIEWDISTANCE) {
          averageVelocity.add(otherBoid.velocity);
          counter++;
        }
      }
    }
    if (counter) {
      averageVelocity.divideScalar(counter);
      averageVelocity.multiplyScalar(MATCHAMMOUNT);
      this.acceleration.add(averageVelocity);
    }
  }
  #goToCenter(boidList) {
    const VIEWDISTANCE = 10;
    const TURNFACTOR = 1;
    let counter = 0;
    let average = new THREE.Vector3(0, 0, 0);
    for (let otherBoid of boidList) {
      if (otherBoid !== this) {
        if (this.getDistance(otherBoid) <= VIEWDISTANCE) {
          average.add(otherBoid.threeBoid.position);
          counter++;
        }
      }
    }
    if (counter) {
      average.divideScalar(counter);
      const changePosition = this.threeBoid.position.clone();
      changePosition.sub(average).multiplyScalar(TURNFACTOR);
      this.acceleration.sub(changePosition);
    }
  }
}
