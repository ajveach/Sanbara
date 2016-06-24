import RendererController from "../../../src/public/renderer/RendererController.class.js";

var supportedRevision = "78";

export default class THREERenderer extends RendererController{
  constructor(options){
    super();
    
    options = options || {};

    // sanbara requires the dimensions be set for system logic
    this.dimensions = 3;
    // A name is required for renderer adapters
    this.name = "THREE.js";
    
    var THREE = window.THREE;

    // Verify three.js is available
    if(!THREE){
      throw new Error("THREE cannot be found.");
    }

    // Check revision number and warn user if it doesn't match the expected one
    if(THREE.REVISION !== supportedRevision){
      console.log("Warning: Currently using THREE revision " + THREE.REVISION + " but the Sanbara adapter supports revision " + supportedRevision);
    }

    // Create container object for all THREE type properties
    this.THREE = {};
  }

  startAnimation(){
    var rendererController = this,
        THREE = this.THREE;
    
    var animate = function(){
      requestAnimationFrame(animate);
      rendererController.frameStart(THREE.scene);
      THREE.renderer.render(THREE.scene, THREE.camera);
    };

    animate();
  }

  onResize(){
    super.onResize();
    console.log(2);
  }

  onSceneLoad(unloadingScene, loadingScene, next){
    super.onSceneLoad();

    // Create THREE camera
    this.THREE.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    this.THREE.camera.position.z = 30;

    // Create THREE scene
    this.THREE.scene = new THREE.Scene();

    // Create renderer
    this.THREE.renderer = new THREE.WebGLRenderer();
    this.THREE.renderer.setSize( window.innerWidth, window.innerHeight);

    // Append dom element as terget of renderer
    document.body.appendChild(this.THREE.renderer.domElement);

    // The next callback must be called. If it is passed to the super method it will be called there, but if logic needs to happen in this method, do not pass it to the super method.
    next();
  }
  
  onNodeAdded(node){
    super.onNodeAdded(node);
    
    // A node has been added to the sanbara scene. Add it to the THREE scene
    if(!node.mesh){
      throw new Error("When using the three.js adapter, all nodes must include a mesh property.");
    }

    this.THREE.scene.add(node.mesh);
  }
};