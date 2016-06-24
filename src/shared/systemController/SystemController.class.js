import System from "../system/System.class";
import Scene from "../scene/Scene.class";
import RendererController from "../../public/renderer/RendererController.class";

export default class SystemController{
  constructor(){
    var controller = this;

    this._scenes = {};
    this._systems = {};

    window.addEventListener("resize",function(){
      // Call method in anonymous function in order to maintain proper this value
      controller.onWindowResize();
    });
  }

  get scenes(){
    return this._scenes;
  }

  addScene(scene){
    if(!scene instanceof Scene){
      throw new Error("The scene provided is not valid");
    }

    this._scenes[scene.name] = scene;

    scene.systemController = this;

    // Set as current scene if none exist
    if(!this.currentScene){
      this.currentScene = scene;
    }
  }

  loadScene(name){
    if(!this._scenes[name]){
      throw new Error("No scene has been created with the name \""+name+"\"");
    }

    var systemController = this;
    
    // Trigger onSceneLoad method on rendererController to let it know the scene is about to change
    this.rendererController.onSceneLoad(this.currentScene, this._scenes[name],function(){
      // This callback is required to ensure all of the pre-loading logic for the renderer is complete

      systemController._scenes[name].Load(function(){
        systemController.currentScene = systemController._scenes[name];
        // Start animation
        systemController.rendererController.startAnimation();
      });
    });
  }

  get currentScene(){
    return this._currentScene;
  }

  set currentScene(value){
    this._currentScene = value;
  }

  get systems(){
    return this._systems;
  }

  addSystem(system){
    if(!system instanceof System){
      throw new Error("The system provided is not valid");
    }

    system.controller = this;

    this._systems[system.name] = system;
  }

  get rendererController(){
    return this._rendererController;
  }

  set rendererController(rendererController){
    if(!rendererController instanceof RendererController){
      throw new Error("The renderer provided is not valid");
    }

    this._rendererController = rendererController;
    rendererController.systemController = this;
  }

  /**
   * Method to call appropriate logic when window is resized 
   */
  onWindowResize(){
    // Call onResize method for rendererController
    this.rendererController.onResize();

    // Call onResize method of current scene
    this.currentScene.onResize();
  }
}