export class SanbaraBase{
  // Name value
  get name(){
    return this._name;
  }
  set name(val){
    if(typeof val !== "string"){
      throw new Error("This value must be of type string");
    }

    this._name = val;
  }

  constructor(){
    this._name = this.constructor.name;
  }
}