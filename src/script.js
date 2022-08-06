import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

//Loader

const textureLoader = new THREE.TextureLoader();

const normalTexture = textureLoader.load("/textures/NormalMap.png");

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereBufferGeometry(2, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.normalMap = normalTexture;
material.color = new THREE.Color(0x323232);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

//Light2

const pointLight2 = new THREE.PointLight(0xff0000, 3);
pointLight2.position.x = -6;
pointLight2.position.y = 6;
pointLight2.position.z = -6;
scene.add(pointLight2);

const pointLight2Helper = new THREE.PointLightHelper(pointLight2, 1);
scene.add(pointLight2Helper);

const light2 = gui.addFolder("Light 2");

light2.add(pointLight2.position, "x").min(-6).max(6).step(1);
light2.add(pointLight2.position, "y").min(-6).max(8).step(1);
light2.add(pointLight2.position, "z").min(-6).max(6).step(1);
light2.add(pointLight2, "intensity").min(0).max(4).step(1);

//Light3

const pointLight3 = new THREE.PointLight(0x21ca0, 3);
pointLight3.position.x = 3;
pointLight3.position.y = -3;
pointLight3.position.z = 0;
scene.add(pointLight3);

const pointLight3Helper = new THREE.PointLightHelper(pointLight3, 1);
scene.add(pointLight3Helper);

const light3 = gui.addFolder("Light 3");

light3.add(pointLight3.position, "x").min(-6).max(6).step(1);
light3.add(pointLight3.position, "y").min(-6).max(8).step(1);
light3.add(pointLight3.position, "z").min(-6).max(6).step(1);
light3.add(pointLight3, "intensity").min(0).max(4).step(1);

const light3Color = {
  color: 0xff0000,
};

light3.addColor(light3Color, "color").onChange(() => {
  pointLight3.color.set(light3Color.color);
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 5;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

const onDocumentMouseMove = (event) => {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
};

const updateSphere = (event) => {
  sphere.position.y = window.scrollY * 0.001;
};

document.addEventListener("mousemove", onDocumentMouseMove);
window.addEventListener("scroll", updateSphere);

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
  sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);
  sphere.position.y += -0.05 * (targetY - sphere.rotation.x);

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
