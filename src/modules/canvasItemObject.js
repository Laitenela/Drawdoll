import { v4 as uuidv4 } from 'uuid';
import { updater } from './updater';

export class CanvasItemObject{
  id;
  element;
  constructor(canvas, drawingCanvas){
    this.id = uuidv4();
    this.canvas = canvas;
    this.drawingCanvas = drawingCanvas;
    updater.add(`${this.id}_update`, this.update, this);
    updater.add(`${this.id}_draw`, this.draw, this);
  }

  draw(){

  }

  changeNative(param, newValue){
    this.element.param = newValue;
  }

  update(delta){

  }
}