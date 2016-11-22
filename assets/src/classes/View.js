import {SanbaraBase} from "./SanbaraBase";

export class View extends SanbaraBase{
  constructor(){
    super();

  }

  onAddedToSystem(system){
    this._system = system;
  }
}