import {SanbaraBase} from "./SanbaraBase";

export class Model extends SanbaraBase{
  constructor(){
    super();

  }

  onAddedToSystem(system){
    this._system = system;
  }
}