import { CanvasItemObject } from "@modules/canvasItemObject";

export class Edge extends CanvasItemObject {
  paint;
  direction;
  length;
  rotation;
  startPosition;
  endPosition;
  childrens = [];
  prevEndPosition;

  constructor(canvas, drawingCanvas, settings) {
    super(canvas, drawingCanvas);
    this.settings = settings;
    this.startPosition = {
      x: settings.x1,
      y: settings.y1,
    }

    this.direction = settings.direction;
    this.length = settings.length;
    this.rotation = settings.rotation;
    this.speed = settings.speed;
    this.paint = settings.paint;
    this.color = settings.color;

    this.endPosition = this.#calculateEndPosition();
    this.prevEndPosition = this.endPosition;

    if (settings.childrens) {
      this.childrens = [];
      for (const childSettings of settings.childrens) {
        const startPosition = this.endPosition;
        this.childrens.push(new Edge(canvas, this.drawingCanvas, { startPosition, ...childSettings }));
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