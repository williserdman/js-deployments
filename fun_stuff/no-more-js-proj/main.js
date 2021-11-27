
//import { Scene, AmbientLight, GridHelper, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PointLight, PointLightHelper, SphereBufferGeometry, TextureLoader, TorusBufferGeometry, WebGLRenderer } from "three";
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Scene, AmbientLight, GridHelper, MathUtils, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PointLight, PointLightHelper, SphereBufferGeometry, TextureLoader, TorusBufferGeometry, WebGLRenderer } from "https://cdn.skypack.dev/three";
import { OrbitControls } from "https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls";

import spaceImage from "./assets/images/spaceImage.jpg";
import normalTexture from "./assets/images/normal_texture.png";
import jupiterTexture from "./assets/images/8k_jupiter_texture.jpg";

function main() {
  const scene = new Scene();
  const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

  const renderer = new WebGLRenderer({
      canvas: document.getElementById("bg")
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.z = document.body.getBoundingClientRect().top * -0.01 + 30;

  const torus = new Mesh(
      new TorusBufferGeometry(10, 3, 16, 100),
      new MeshStandardMaterial({ color: 0xff6347, wireframe: false})
  );
  scene.add(torus);

  const pointLight = new PointLight(0xffffff, 0.5);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);
  const ambientLight = new AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Helpers
  const pointLightHelper = new PointLightHelper(pointLight);
  const gridHelper = new GridHelper(200, 50);
  //scene.add(pointLightHelper, gridHelper);

  // Orbit controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // Adding stars
  Array(400).fill().forEach(createStar);

  // Loading bg image/texture
  const loader = new TextureLoader()
  const bgTexture = loader.load(spaceImage);
  scene.background = bgTexture;

  const jupiter = new Mesh(
    new SphereBufferGeometry(),
    new MeshStandardMaterial({
      map: loader.load(jupiterTexture),
      normalMap: loader.load(normalTexture)

    })
  );
  jupiter.scale.set(10, 10, 10);
  jupiter.position.z = 80;
  jupiter.position.x = -20;
  scene.add(jupiter);

  window.addEventListener("resize", () => {
    console.log("resizing");
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  // Dealing with scrolling
  document.body.onscroll = moveCamera;

  function moveCamera() {
    const t = document.body.getBoundingClientRect().top;

    jupiter.rotation.x += 0.0001;
    jupiter.rotation.y += 0.05;
    jupiter.rotation.z += 0.0001;

    camera.position.z = t * -0.01 + 30;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
  }

  function createStar() {
    const star = new Mesh(
      new SphereBufferGeometry(0.25, 24, 24),
      new MeshBasicMaterial({ color: 0xffffff })
    );

    const [x, y, z] = Array(3).fill().map(() => MathUtils.randFloatSpread(200));
    star.position.set(x, y, z);
    scene.add(star);
  }

  function animate() {
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    torus.rotation.z += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}

window.onload = main;
