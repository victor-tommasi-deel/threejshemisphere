import {
  Scene,
  PerspectiveCamera,
  Color,
  WebGLRenderer,
  Mesh,
  HemisphereLight,
  BoxGeometry,
  MeshPhongMaterial,
  DoubleSide,
  SphereGeometry
} from 'three';

const MeshPhong = (obj) => new MeshPhongMaterial(obj);

const createCube = (width, height, depth) => {
  const geometry = new BoxGeometry(width, height, depth);
  const material = MeshPhong({
    color: 0x0f1d89,
    shininess: 100,
    side: DoubleSide
  });
  const cube = new Mesh(geometry, material);
  cube.position.z = -6;
  cube.position.y = -5;
  cube.position.x = -6;
  return cube;
};

const createSphere = (radius, widthSegments, heightSegments) => {
  const geometry = new SphereGeometry(radius, widthSegments, heightSegments);
  const material = MeshPhong({
    color: 0x66cdaa,
    shininess: 100,
    side: DoubleSide
  });
  const sphere = new Mesh(geometry, material);
  sphere.position.set(-5, 5, -5);
  return sphere;
};

const createPlane = (width, height, depth) => {
  const geometry = new BoxGeometry(width, height, depth);
  const material = MeshPhong({ color: 0x693421, side: DoubleSide });
  const plane = new Mesh(geometry, material);
  plane.position.y = -1;
  return plane;
};

const init = (objs, position) => {
  const { innerWidth, innerHeight } = window;
  const scene = new Scene();
  scene.background = new Color(0x000000);
  const camera = new PerspectiveCamera(75, innerWidth / innerHeight, 1, 1000);
  camera.position.set(position.x, position.y, position.z);

  const light = new HemisphereLight(0x00ff00, 0x0000ff);
  scene.add(light);

  Object.entries(objs).forEach((entry) => {
    const value = entry[1];
    scene.add(value);
  });

  const renderer = new WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  return { renderer, scene, camera, light };
};

export { init, createCube, createSphere, createPlane };
