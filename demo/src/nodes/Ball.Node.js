import Node from "../../../src/shared/scene/Node.class";

export default class Ball extends Node{
  constructor(options){
    super(options);

    var THREE = window.THREE;
    var geometry = new THREE.SphereGeometry( 15, 16, 16 );
    var material = new THREE.MeshLambertMaterial( {color: 0x00aaff} );
    this.threeObject = new THREE.Mesh( geometry, material );

    this.threeObject.position.z -= 30;
  }

  update(){
    super.update();

    this.threeObject.rotation.x += 0.01;
    this.threeObject.rotation.y += 0.02;
  }
}