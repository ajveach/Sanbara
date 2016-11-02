import System from "../../../src/shared/system/System.class";
import Ball from "../nodes/Ball.Node";
import DirectionalLight from "../nodes/DirectionalLight.Node";
import PointLight from "../nodes/PointLight.Node";

export default class BallSpinner extends System{
  constructor(options){
    options.name = options.name || "BallSpinner";
    super(options);
  }

  onSceneLoad(scene){
    var THREE = window.THREE;

    var ballNode = new Ball({});
    var lightNode = new DirectionalLight({
      x: 10,
      y: -20,
      z: 10
    });

    var redLightNode = new PointLight({
      color: 0x00ff00,
      x: -30,
      y: 20,
      z: -10
    });
    console.log(redLightNode);

    scene.add(ballNode);
    scene.add(lightNode);
    scene.add(redLightNode);
  }
}