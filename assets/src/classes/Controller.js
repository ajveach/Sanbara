import {SanbaraBase} from "./SanbaraBase";
import {Model} from "./Model";

export class Controller extends SanbaraBase{
  constructor(){
    super();
  }

  onAddedToSystem(system){
    this._system = system;
  }
}