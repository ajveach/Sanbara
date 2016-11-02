/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _SystemController = __webpack_require__(1);
	
	var _SystemController2 = _interopRequireDefault(_SystemController);
	
	var _Play = __webpack_require__(5);
	
	var _Play2 = _interopRequireDefault(_Play);
	
	var _BallSpinner = __webpack_require__(7);
	
	var _BallSpinner2 = _interopRequireDefault(_BallSpinner);
	
	var _THREE = __webpack_require__(6);
	
	var _THREE2 = _interopRequireDefault(_THREE);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var systemController = new _SystemController2.default({});
	
	// Add renderer controller to system controller
	systemController.rendererController = new _THREE2.default();
	
	// Add scene to system controller. First scene will be default scene
	systemController.addScene(new _Play2.default());
	
	systemController.addSystem(new _BallSpinner2.default({}));
	
	systemController.loadScene("Play");
	
	exports.default = systemController;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _System = __webpack_require__(2);
	
	var _System2 = _interopRequireDefault(_System);
	
	var _Scene = __webpack_require__(3);
	
	var _Scene2 = _interopRequireDefault(_Scene);
	
	var _RendererController = __webpack_require__(4);
	
	var _RendererController2 = _interopRequireDefault(_RendererController);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SystemController = function () {
	  function SystemController() {
	    _classCallCheck(this, SystemController);
	
	    var controller = this;
	
	    this._scenes = {};
	    this._systems = {};
	
	    window.addEventListener("resize", function () {
	      // Call method in anonymous function in order to maintain proper this value
	      controller.onWindowResize();
	    });
	  }
	
	  _createClass(SystemController, [{
	    key: "addScene",
	    value: function addScene(scene) {
	      if (!scene instanceof _Scene2.default) {
	        throw new Error("The scene provided is not valid");
	      }
	
	      if (typeof scene.name !== "string" || !scene.name) {
	        throw new Error("All scenes are required to have a name");
	      }
	
	      this._scenes[scene.name] = scene;
	
	      scene.systemController = this;
	
	      // Set as current scene if none exist
	      if (!this.currentScene) {
	        this.currentScene = scene;
	      }
	    }
	  }, {
	    key: "loadScene",
	    value: function loadScene(name) {
	      if (!this._scenes[name]) {
	        throw new Error("No scene has been created with the name \"" + name + "\"");
	      }
	
	      var systemController = this;
	
	      // Trigger onSceneLoad method on rendererController to let it know the scene is about to change
	      this.rendererController.onSceneLoad(this.currentScene, this._scenes[name], function () {
	        // This callback is required to ensure all of the pre-loading logic for the renderer is complete
	
	        systemController._scenes[name].Load(function () {
	          systemController.currentScene = systemController._scenes[name];
	          // Start animation
	          systemController.rendererController.startAnimation();
	        });
	      });
	    }
	  }, {
	    key: "addSystem",
	    value: function addSystem(system) {
	      if (!system instanceof _System2.default) {
	        throw new Error("The system provided is not valid");
	      }
	
	      system.controller = this;
	
	      this._systems[system.name] = system;
	    }
	  }, {
	    key: "onWindowResize",
	
	
	    /**
	     * Method to call appropriate logic when window is resized 
	     */
	    value: function onWindowResize() {
	      // Call onResize method for rendererController
	      this.rendererController.onResize();
	
	      // Call onResize method of current scene
	      this.currentScene.onResize();
	    }
	  }, {
	    key: "scenes",
	    get: function get() {
	      return this._scenes;
	    }
	  }, {
	    key: "currentScene",
	    get: function get() {
	      return this._currentScene;
	    },
	    set: function set(value) {
	      this._currentScene = value;
	    }
	  }, {
	    key: "systems",
	    get: function get() {
	      return this._systems;
	    }
	  }, {
	    key: "rendererController",
	    get: function get() {
	      return this._rendererController;
	    },
	    set: function set(rendererController) {
	      if (!rendererController instanceof _RendererController2.default) {
	        throw new Error("The renderer provided is not valid");
	      }
	
	      this._rendererController = rendererController;
	      rendererController.systemController = this;
	    }
	  }]);
	
	  return SystemController;
	}();
	
	exports.default = SystemController;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var System = function () {
	  function System(options) {
	    _classCallCheck(this, System);
	
	    this.name = options.name;
	  }
	
	  _createClass(System, [{
	    key: "onSceneLoad",
	
	
	    // Placeholder method that should be overridden by each system
	    value: function onSceneLoad() {}
	  }, {
	    key: "name",
	    set: function set(value) {
	      if (typeof value !== "string") {
	        throw new Error("The name provided for this system is not valid");
	      }
	
	      this._name = value;
	    },
	    get: function get() {
	      return this._name;
	    }
	  }, {
	    key: "controller",
	    set: function set(value) {
	      this._controller = value;
	    },
	    get: function get() {
	      return this._controller;
	    }
	  }]);
	
	  return System;
	}();
	
	exports.default = System;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Scene = function () {
	  function Scene() {
	    _classCallCheck(this, Scene);
	
	    this.nodes = [];
	
	    this._active = false;
	
	    // This will be set by the system controller when the scene is added
	    this.systemController = null;
	  }
	
	  _createClass(Scene, [{
	    key: "add",
	    value: function add(node) {
	      this.nodes.push(node);
	      this.systemController.rendererController.onNodeAdded(node);
	    }
	
	    // Method to start the loading process for this scene
	
	  }, {
	    key: "Load",
	    value: function Load(next) {
	      this._active = true;
	
	      // Perform scene's logic before loading begins
	      this.onLoad();
	
	      // Perform systems logic for scene load
	      for (var name in this.systemController.systems) {
	        if (!this.systemController.systems.hasOwnProperty(name)) {
	          continue;
	        }
	
	        this.systemController.systems[name].onSceneLoad(this);
	      }
	
	      // this.afterLoad();
	
	      next();
	    }
	
	    // Method called when scene begins loading
	
	  }, {
	    key: "onLoad",
	    value: function onLoad() {}
	
	    // Method to start the unloading process for this scene
	
	  }, {
	    key: "Unload",
	    value: function Unload() {}
	
	    // Method called when window is resized and this is the current scene
	
	  }, {
	    key: "onResize",
	    value: function onResize() {}
	  }, {
	    key: "active",
	    get: function get() {
	      return this._active;
	    }
	  }]);
	
	  return Scene;
	}();
	
	exports.default = Scene;
	;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var RendererController = function () {
	  function RendererController(options) {
	    _classCallCheck(this, RendererController);
	  }
	
	  // The frameStart method calls each node's update method
	
	
	  _createClass(RendererController, [{
	    key: "frameStart",
	    value: function frameStart() {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = this.systemController.currentScene.nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var node = _step.value;
	
	          node.update();
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	  }, {
	    key: "onResize",
	    value: function onResize() {
	      console.log(1);
	    }
	  }, {
	    key: "onSceneLoad",
	    value: function onSceneLoad(unloadingScene, loadingScene, next) {
	      if (typeof next === "function") {
	        next();
	      }
	    }
	  }, {
	    key: "onNodeAdded",
	    value: function onNodeAdded(node) {}
	  }]);
	
	  return RendererController;
	}();
	
	exports.default = RendererController;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Scene2 = __webpack_require__(3);
	
	var _Scene3 = _interopRequireDefault(_Scene2);
	
	var _THREE = __webpack_require__(6);
	
	var _THREE2 = _interopRequireDefault(_THREE);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Play = function (_Scene) {
	  _inherits(Play, _Scene);
	
	  function Play() {
	    _classCallCheck(this, Play);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Play).call(this));
	
	    _this.name = "Play";
	    return _this;
	  }
	
	  _createClass(Play, [{
	    key: "onResize",
	    value: function onResize() {
	      _get(Object.getPrototypeOf(Play.prototype), "onResize", this).call(this);
	    }
	  }, {
	    key: "onLoad",
	    value: function onLoad() {}
	  }]);
	
	  return Play;
	}(_Scene3.default);
	
	exports.default = Play;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _RendererControllerClass = __webpack_require__(4);
	
	var _RendererControllerClass2 = _interopRequireDefault(_RendererControllerClass);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var supportedRevision = "78";
	
	var THREERenderer = function (_RendererController) {
	  _inherits(THREERenderer, _RendererController);
	
	  function THREERenderer(options) {
	    _classCallCheck(this, THREERenderer);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(THREERenderer).call(this));
	
	    options = options || {};
	
	    // sanbara requires the dimensions be set for system logic
	    _this.dimensions = 3;
	    // A name is required for renderer adapters
	    _this.name = "THREE.js";
	
	    var THREE = window.THREE;
	
	    // Verify three.js is available
	    if (!THREE) {
	      throw new Error("THREE cannot be found.");
	    }
	
	    // Check revision number and warn user if it doesn't match the expected one
	    if (THREE.REVISION !== supportedRevision) {
	      console.log("Warning: Currently using THREE revision " + THREE.REVISION + " but the Sanbara adapter supports revision " + supportedRevision);
	    }
	
	    // Create container object for all THREE type properties
	    _this.THREE = {};
	    return _this;
	  }
	
	  _createClass(THREERenderer, [{
	    key: "startAnimation",
	    value: function startAnimation() {
	      var rendererController = this,
	          THREE = this.THREE;
	
	      var animate = function animate() {
	        requestAnimationFrame(animate);
	        rendererController.frameStart(THREE.scene);
	        THREE.renderer.render(THREE.scene, THREE.camera);
	      };
	
	      animate();
	    }
	  }, {
	    key: "onResize",
	    value: function onResize() {
	      _get(Object.getPrototypeOf(THREERenderer.prototype), "onResize", this).call(this);
	      console.log(2);
	    }
	  }, {
	    key: "onSceneLoad",
	    value: function onSceneLoad(unloadingScene, loadingScene, next) {
	      _get(Object.getPrototypeOf(THREERenderer.prototype), "onSceneLoad", this).call(this);
	
	      // Create THREE camera
	      this.THREE.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
	      this.THREE.camera.position.z = 30;
	
	      // Create THREE scene
	      this.THREE.scene = new THREE.Scene();
	
	      // Create renderer
	      this.THREE.renderer = new THREE.WebGLRenderer();
	      this.THREE.renderer.setSize(window.innerWidth, window.innerHeight);
	
	      // Append dom element as terget of renderer
	      document.body.appendChild(this.THREE.renderer.domElement);
	
	      // The next callback must be called. If it is passed to the super method it will be called there, but if logic needs to happen in this method, do not pass it to the super method.
	      next();
	    }
	  }, {
	    key: "onNodeAdded",
	    value: function onNodeAdded(node) {
	      _get(Object.getPrototypeOf(THREERenderer.prototype), "onNodeAdded", this).call(this, node);
	
	      // If node doesn't have a parent then add directly to the scene
	      if (!node.parent) {
	        this.THREE.scene.add(node.threeObject);
	      } else {
	        node.parent.threeObject.add(node.threeObject);
	      }
	    }
	  }]);
	
	  return THREERenderer;
	}(_RendererControllerClass2.default);
	
	exports.default = THREERenderer;
	;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _System2 = __webpack_require__(2);
	
	var _System3 = _interopRequireDefault(_System2);
	
	var _Ball = __webpack_require__(8);
	
	var _Ball2 = _interopRequireDefault(_Ball);
	
	var _DirectionalLight = __webpack_require__(10);
	
	var _DirectionalLight2 = _interopRequireDefault(_DirectionalLight);
	
	var _PointLight = __webpack_require__(11);
	
	var _PointLight2 = _interopRequireDefault(_PointLight);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BallSpinner = function (_System) {
	  _inherits(BallSpinner, _System);
	
	  function BallSpinner(options) {
	    _classCallCheck(this, BallSpinner);
	
	    options.name = options.name || "BallSpinner";
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(BallSpinner).call(this, options));
	  }
	
	  _createClass(BallSpinner, [{
	    key: "onSceneLoad",
	    value: function onSceneLoad(scene) {
	      var THREE = window.THREE;
	
	      var ballNode = new _Ball2.default({});
	      var lightNode = new _DirectionalLight2.default({
	        x: 10,
	        y: -20,
	        z: 10
	      });
	
	      var redLightNode = new _PointLight2.default({
	        color: 0x00ff00,
	        x: -30,
	        y: 20,
	        z: -10
	      });
	      console.log(redLightNode);
	
	      scene.add(ballNode);
	      scene.add(lightNode);
	      scene.add(redLightNode);
	    }
	  }]);
	
	  return BallSpinner;
	}(_System3.default);
	
	exports.default = BallSpinner;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Node2 = __webpack_require__(9);
	
	var _Node3 = _interopRequireDefault(_Node2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Ball = function (_Node) {
	  _inherits(Ball, _Node);
	
	  function Ball(options) {
	    _classCallCheck(this, Ball);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Ball).call(this, options));
	
	    var THREE = window.THREE;
	    var geometry = new THREE.SphereGeometry(15, 16, 16);
	    var material = new THREE.MeshLambertMaterial({ color: 0x00aaff });
	    _this.threeObject = new THREE.Mesh(geometry, material);
	
	    _this.threeObject.position.z -= 30;
	    return _this;
	  }
	
	  _createClass(Ball, [{
	    key: "update",
	    value: function update() {
	      _get(Object.getPrototypeOf(Ball.prototype), "update", this).call(this);
	
	      this.threeObject.rotation.x += 0.01;
	      this.threeObject.rotation.y += 0.02;
	    }
	  }]);
	
	  return Ball;
	}(_Node3.default);
	
	exports.default = Ball;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Node = function () {
	  function Node() {
	    _classCallCheck(this, Node);
	  }
	
	  _createClass(Node, [{
	    key: "update",
	    value: function update() {}
	  }]);
	
	  return Node;
	}();
	
	exports.default = Node;
	;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Node2 = __webpack_require__(9);
	
	var _Node3 = _interopRequireDefault(_Node2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DirectionalLight = function (_Node) {
	  _inherits(DirectionalLight, _Node);
	
	  function DirectionalLight(options) {
	    _classCallCheck(this, DirectionalLight);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DirectionalLight).call(this, options));
	
	    options = options || {};
	
	    var THREE = window.THREE;
	    _this.threeObject = new THREE.DirectionalLight(options.color || 0xffffff, options.intensity || 1);
	    _this.threeObject.position.set(options.x || 0, options.y || 0, options.z || 0);
	    return _this;
	  }
	
	  return DirectionalLight;
	}(_Node3.default);
	
	exports.default = DirectionalLight;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Node2 = __webpack_require__(9);
	
	var _Node3 = _interopRequireDefault(_Node2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PointLight = function (_Node) {
	  _inherits(PointLight, _Node);
	
	  function PointLight(options) {
	    _classCallCheck(this, PointLight);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PointLight).call(this, options));
	
	    options = options || {};
	
	    var THREE = window.THREE;
	    _this.threeObject = new THREE.PointLight(options.color || 0xffffff, options.intensity || 1, options.distance || 0, options.decay);
	    _this.threeObject.position.set(options.x || 0, options.y || 0, options.z || 0);
	    return _this;
	  }
	
	  return PointLight;
	}(_Node3.default);
	
	exports.default = PointLight;

/***/ }
/******/ ]);
//# sourceMappingURL=demo.js.map