import {SanbaraBase} from "./classes/SanbaraBase";
import {Scene} from "./classes/Scene";
import {System} from "./classes/System";

/**
 * GameManager Class
 * Singleton automatically created by Sanbara to manage game states, scenes, and systems
 */
export class GameManager extends SanbaraBase{
  constructor(){
    super();

    this._scenes = {};
    // Indexed array of scene names to keep the order defined in sanbara.config.js
    this._sceneIndex = [];
    this._systems = {};

    this._currentScene = null;
  }

  get scenes(){
    return this._scenes;
  }

  get currentScene(){
    return this._currentScene;
  }

  addScene(scene, index){
    if(!scene instanceof Scene){
      throw new Error("The object provided is not a valid scene");
    }

    if(!scene.name){
      throw new Error("A scene cannot be added to the game manager without first having a name");
    }

    this._scenes[scene.name] = scene;
    this._sceneIndex.push(scene.name);
  }

  addSystem(system){
    if(!system instanceof System){
      throw new Error("The object provided is not a valid system");
    }

    if(!system.name){
      throw new Error("A system cannot be added to the game manager without first having a name");
    }

    this._systems[system.name] = system;
  }

  build(parentElementID){
    let parentElement = document.body;
    if(parentElementID){
      parentElement = document.getElementById(parentElementID);

      if(!parentElement){
        throw new Error("The parent element in sanbara.config.js must be a valid DOM element ID");
      }
    }

    // Create canvas element
    this._canvas = document.createElement("canvas");
    this._canvas.id = "Sanbara";
    parentElement.appendChild(this._canvas);
  }

  start(){
    if(this._sceneIndex.length === 0){
      throw new Error("Cannot start game without any scenes");
    }

    this.loadScene(0);
  }

  loadScene(sceneIdentifier){
    // Unload current scene
    if(this.currentScene){

    }

    // Find scene by name or array index
    let newScene = null;
    if(typeof sceneIdentifier === "number"){
      if(!this._sceneIndex[sceneIdentifier]){
        throw new Error("No scene found at index "+sceneIdentifier);
      }

      // load by array index
      let newSceneName = this._sceneIndex[sceneIdentifier];
      newScene = new this._scenes[newSceneName];
      if(!newScene instanceof Scene){
        throw new Error("The scene at index "+0+" cannot be loaded because it is not an instance of the Scene class");
      }
    }
    else if(typeof sceneIdentifier === "string"){
      if(!this._scenes[sceneIdentifier]){
        throw new Error("No scene found with the name "+sceneIdentifier);
      }

      // load by name
      newScene = new this._scenes[sceneIdentifier];
      if(!newScene instanceof Scene){
        throw new Error("The scene with name " + sceneIdentifier + " cannot be loaded because it is not an instance of the Scene class");
      }
    }
    else{
      throw new Error("A numerical index or name string must be provided to identify the scene to load");
    }

    newScene.setGameManager(this);
    this._currentScene = newScene;
    this._currentScene.load();
  }

  getSystem(systemName){
    if(!this._systems[systemName]){
      throw new Error("No system could be found with the name \"" + systemName + "\"");
    }

    // Some systems are singletons, but this can't be determined for a system until an instance has been created
    // Check if the system is an object already. If so, it is an instance and a reference to the existing object should be passed
    if(this._systems[systemName] instanceof System){
      return this._systems[systemName];
    }
    else{
      // Create an instance of the system
      let systemInstance = new this._systems[systemName];

      // Check to see if this should be a singleton. If so, override the function with the instanced object in the systems list
      if(systemInstance.singleton){
        this._systems[systemName] = systemInstance;
      }

      return systemInstance;
    }
  }
}