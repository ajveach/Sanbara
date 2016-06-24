export default class RendererController{
  constructor(options){

  }

  // The frameStart method calls each node's update method
  frameStart(){
    for(const node of this.systemController.currentScene.nodes){
      node.update();
    }
  }

  onResize(){
    console.log(1);
  }

  onSceneLoad(unloadingScene, loadingScene, next){
    if(typeof next === "function"){
      next();
    }
  }

  onNodeAdded(node){
    
  }
}