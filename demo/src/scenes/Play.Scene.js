import Scene from "../../../src/shared/scene/Scene.class";
import THREEAdapter from "../../../adapters/rendering/THREE.js/THREE.adapter";

export default class Play extends Scene{
  constructor(){
    super();

    this.name = "Play";
  }

  onResize(){
    super.onResize();
  }

  onLoad(){
    
  }
}