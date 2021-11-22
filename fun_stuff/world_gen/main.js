import * as THREE from "three";
import backgroundSpace from "./assets/images/spaceImage.jpg";
import { WebGLRenderer } from "three";

function init() {
  const scene = new THREE.Scene();
  const mainCamera = new THREE.PerspectiveCamera(
    74,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(timeStamp) {
  renderer.render(scene, mainCamera);
  requestAnimationFrame(animate);
}
