import {System} from "../../src/classes/System";
import {GameTimeController} from "../controllers/GameTime.Controller";
import {GameTimeModel} from "../models/GameTime.Model";
import {GameTimeView} from "../views/GameTime.View";

export class TimerSystem extends System{
  constructor(){
    super();

    this.addController(new GameTimeController());
    this.addModel(new GameTimeModel());
    this.addView(new GameTimeView());
  }

  onSceneLoad(){
    super.onSceneLoad();
  }
}