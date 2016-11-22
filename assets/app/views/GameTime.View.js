import {View} from "../../src/classes/View";

export class GameTimeView extends View{
  constructor(){
    super();
  }

  onAddedToSystem(system){
    this._system = system;
  }
}