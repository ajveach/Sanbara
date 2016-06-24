export default class Scene{
  constructor(){
    this.nodes = [];

    this._active = false;
    
    // This will be set by the system controller when the scene is added
    this.systemController = null;
  }

  get active(){
    return this._active;
  }

  add(node){
    this.nodes.push(node);
    this.systemController.rendererController.onNodeAdded(node)
  }

  // Method to start the loading process for this scene
  Load(next){
    this._active = true;

    // Perform scene's logic before loading begins
    this.onLoad();
    
    // Perform systems logic for scene load
    for(let name in this.systemController.systems){
      if(!this.systemController.systems.hasOwnProperty(name)){
        continue;
      }
      
      this.systemController.systems[name].onSceneLoad(this);
    }

    // this.afterLoad();

    next();
  }

  // Method called when scene begins loading
  onLoad(){

  }

  // Method to start the unloading process for this scene
  Unload(){

  }

  // Method called when window is resized and this is the current scene
  onResize(){
  }
};