import System from "../../src/shared/system/System.class";
import Ball from "./Ball.Node";

export default class BallSpinner extends System{
  constructor(options){
    options.name = options.name || "BallSpinner";
    super(options);
  }

  onSceneLoad(scene){
    var ballNode = new Ball({});
    scene.add(ballNode);
  }
}