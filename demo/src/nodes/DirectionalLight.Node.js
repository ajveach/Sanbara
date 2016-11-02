import Node from "../../../src/shared/scene/Node.class";

export default class DirectionalLight extends Node{
  constructor(options){
    super(options);

    options = options || {};

    var THREE = window.THREE;
    this.threeObject = new THREE.DirectionalLight( options.color || 0xffffff, options.intensity || 1 );
    this.threeObject.position.set(options.x || 0, options.y || 0, options.z || 0);
  }
}