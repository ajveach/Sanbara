import SystemController from "../../src/shared/systemController/SystemController.class";
import PlayScene from "./scenes/Play.Scene";
import BallSpinnerSystem from "./systems/BallSpinner.System";

import THREEAdapter from "../../adapters/rendering/THREE.js/THREE.adapter";

var systemController = new SystemController({});

// Add renderer controller to system controller
systemController.rendererController = new THREEAdapter();

// Add scene to system controller. First scene will be default scene
systemController.addScene(new PlayScene());

systemController.addSystem(new BallSpinnerSystem({}));

systemController.loadScene("Play");

export default systemController;