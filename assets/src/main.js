import {GameManager} from "./GameManager";
import gameStructure from "../app/sanbara.config";

let GAME = new GameManager();

// Load all scenes
for(let scene of gameStructure.scenes){
  GAME.addScene(scene);
}

// Load all systems
for(let system of gameStructure.systems){
  GAME.addSystem(system);
}

GAME.build(gameStructure.parentElement);

GAME.start();