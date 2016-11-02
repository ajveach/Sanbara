import Node from "../../../src/shared/scene/Node.class";

export default class PointLight extends Node{
  constructor(options){
    super(options);

    options = options || {};

    var THREE = window.THREE;
    this.threeObject = new THREE.PointLight( options.color || 0xffffff, options.intensity || 1, options.distance || 0, options.decay );
    this.threeObject.position.set(options.x || 0, options.y || 0, options.z || 0);
  }
}