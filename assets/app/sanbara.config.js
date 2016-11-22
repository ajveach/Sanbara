import {MainMenu} from "./scenes/MainMenu.Scene";
import {TimerSystem} from "./systems/Timer.System";

export default {
  parentElement: "SanbaraContainer",
  scenes: [
    MainMenu
  ],
  systems: [
    TimerSystem
  ]
}