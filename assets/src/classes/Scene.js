import {SanbaraBase} from "./SanbaraBase";

export class Scene extends SanbaraBase{
  constructor(){
    super();

    this._systems = {};
  }



  setGameManager(value){
    this._gameManager = value;
  }

  addSystem(systemName){
    // Find the registered system in the Game Manager
    this._systems[systemName] = this._gameManager.getSystem(systemName);
    console.log(this);
  }

  load(){

  }
}