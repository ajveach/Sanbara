import {Model} from "../../src/classes/Model";

export class GameTimeModel extends Model{
  constructor(){
    super();

    this.time = 0;
  }

  get time(){
    return this._time;
  }
  set time(val){
    this._time = val;
  }
}