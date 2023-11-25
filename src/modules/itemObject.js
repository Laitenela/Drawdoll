import { v4 as uuidv4 } from 'uuid';
import { updater } from './updater';

class ItemObject{
  id;
  element;
  constructor(){
    this.id = uuidv4();
    updater.add(this.id, this.update, this);
    this.initialize();
  }

  initialize(){

  }

  changeNative(param, newValue){
    this.element.param = newValue;
  }

  update(delta){

  }
}