import Node from "../../src/shared/scene/Node.class";

export default class Ball extends Node{
  constructor(options){
    super(options);

    var THREE = window.THREE;
    var geometry = new THREE.SphereGeometry( 15, 8, 6 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00aaff} );
    this.mesh = new THREE.Mesh( geometry, material );
  }

  update(){
    super.update();

    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;
  }
}