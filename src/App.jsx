import React from 'react';
import { init, createSphere, createCube, createPlane } from './utils/utils';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderer: null,
      scene: null,
      camera: null,
      sphere: null,
      cube: null,
      plane: null,
      light: null
    };
  }

  componentDidMount = () => {
    const sphere = createSphere(5, 30, 30);
    const cube = createCube(5, 5, 5);
    const plane = createPlane(2000, 1, 2000);
    const start = init([sphere, cube, plane], { x: 0, y: 10, z: 20 });
    const { viewer } = this.refs;
    viewer.appendChild(start.renderer.domElement);
    const { renderer, scene, camera, light } = start;
    this.setState({
      renderer,
      scene,
      camera,
      sphere,
      cube,
      plane,
      light
    });
    this.mainLoop();
  };

  mainLoop = () => {
    const { scene, camera, renderer, sphere, cube, plane, light } = this.state;
    if (
      scene !== null &&
      camera !== null &&
      renderer !== null &&
      sphere !== null &&
      cube !== null &&
      plane !== null &&
      light !== null
    ) {
      renderer.render(scene, camera);
    }
    requestAnimationFrame(this.mainLoop);
  };

  body = () => <div ref="viewer"></div>;

  render() {
    return this.body();
  }
}

export default App;
