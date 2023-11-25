import { Edge } from "./edge";

export class PsychoEdge extends Edge{
  lengthSpeedChange = (Math.random() - 1) / 10;
  maxLength = Math.random() * 300;
  constructor(canvas, drawingCanvas, settings){
    super(canvas, drawingCanvas, settings);
  }

  update(delta) {

    if(Math.abs(this.length) > this.maxLength) {
      this.lengthSpeedChange = -this.lengthSpeedChange;
      this.length = Math.sign(this.length) * this.maxLength;
    }
    this.length += this.lengthSpeedChange;
    this.length **= -2;

    this.direction += this.speed * (this.rotation === "right" ? 1 : -1) / 100;
    this.endPosition = this.#calculateEndPosition();

    for(let childEdge of this.childrens){
      childEdge.startPosition = this.endPosition;
      childEdge.update(delta);
    }
  }

  #calculateEndPosition(){
    const radDirection = this.direction * Math.PI / 180;

    return {
      x: this.startPosition.x + this.length * Math.cos(radDirection),
      y: this.startPosition.y + this.length * Math.sin(radDirection),
    }
  }
}