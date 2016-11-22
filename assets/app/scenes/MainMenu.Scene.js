import {Scene} from "../../src/classes/Scene";

export class MainMenu extends Scene{
  constructor(){
    super();
  }

  load(){
    this.addSystem("TimerSystem");
  }
}