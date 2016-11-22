import {SanbaraBase} from "./SanbaraBase";
import {Controller} from "./Controller";
import {Model} from "./Model";
import {View} from "./View";

export class System extends SanbaraBase{
  constructor(){
    super();

    this._controllers = {};
    this._models = {};
    this._views = {};

    this.singleton = false;
  }

  onSceneLoad(scene){

  }

  addController(controller){
    if(!controller instanceof Controller){
      throw new Error("The object provided is not a valid Controller");
    }

    if(!controller.name){
      throw new Error("A controller cannot be added to a system without first having a name");
    }

    this._controllers[controller.name] = controller;
    controller.onAddedToSystem(this);
  }

  addModel(model){
    if(!model instanceof Model){
      throw new Error("The object provided is not a valid Model");
    }

    if(!model.name){
      throw new Error("A model cannot be added to a system without first having a name");
    }

    this._models[model.name] = model;
    model.onAddedToSystem(this);
  }

  addView(view){
    if(!view instanceof View){
      throw new Error("The object provided is not a valid View");
    }

    if(!view.name){
      throw new Error("A view cannot be added to a system without first having a name");
    }

    this._views[view.name] = view;
    view.onAddedToSystem(this);
  }

  get controllers(){
    return this._controllers;
  }

  get models(){
    return this._models;
  }
}