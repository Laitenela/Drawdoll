import { Edge } from "./edge";

export class DzenEdge extends Edge{
  lengthSpeedChange = Math.max(0.01, Math.random());
  maxLength = Math.random() * 300;
  constructor(canvas, drawingCanvas, settings){
    const childrens = settings.childrens;
    settings.childrens = [];
    super(canvas, drawingCanvas, settings);

    if (childrens) {
      this.childrens = [];
      for (const childSettings of childrens) {
        const startPosition = this.endPosition;
        this.childrens.push(new DzenEdge(canvas, this.drawingCanvas, { startPosition, ...childSettings }));
      }
    }
  }

  draw() {
    const endPosition = this.#calculateEndPosition();

    const ctx = this.canvas.getContext("2d");
    ctx.strokeStyle = `rgb(${this.color.red}, ${this.color.green}, ${this.color.blue})`;
    ctx.beginPath();
    ctx.moveTo(this.startPosition.x, this.startPosition.y);
    ctx.lineTo(endPosition.x, endPosition.y);
    ctx.stroke();
    ctx.closePath();

    if (this.paint) {
      const drawingCtx = this.drawingCanvas.getContext("2d");
      drawingCtx.strokeStyle = `rgb(${this.color.red}, ${this.color.green}, ${this.color.blue})`;
      drawingCtx.beginPath();
      drawingCtx.moveTo(this.prevEndPosition.x, this.prevEndPosition.y);
      drawingCtx.lineTo(endPosition.x, endPosition.y);
      drawingCtx.stroke();

      this.prevEndPosition = endPosition;
    }

    for(let childEdge of this.childrens){
      childEdge.draw();
    }
  }

  update(delta) {
    // if(Math.abs(this.length) > this.maxLength) {
    //   this.lengthSpeedChange = -this.lengthSpeedChange;
    //   this.length = Math.sign(this.length) * this.maxLength;
    // }

    this.length = (this.length + this.lengthSpeedChange);

    if(this.length >= this.maxLength){
      this.length = 0;
    }

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