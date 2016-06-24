export default class System{
  constructor(options){
    this.name = options.name;
  }

  set name(value){
    if(typeof value !== "string"){
      throw new Error("The name provided for this system is not valid");
    }

    this._name = value;
  }

  get name(){
    return this._name;
  }

  set controller(value){
    this._controller = value;
  }

  get controller(){
    return this._controller;
  }

  // Placeholder method that should be overridden by each system
  onSceneLoad(){}
}