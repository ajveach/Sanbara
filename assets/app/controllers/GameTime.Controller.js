import {Controller} from "../../src/classes/Controller";
import {GameTimeModel} from "../models/GameTime.Model";

export class GameTimeController extends Controller{
  constructor(){
    super();
  }

  onAddedToSystem(system){
    super.onAddedToSystem(system);
  }
}