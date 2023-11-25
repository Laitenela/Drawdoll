import { Edge } from "@components/items/edge";
import { PsychoEdge } from "@components/items/psychoEdge";
import { Scene } from "@modules/sceneObject";

export class PsychoScene extends Scene {
  constructor(appController) {
    super(appController);
  }

  getRandomChild(childRemains) {
    const edgeSettings = {
      length: 10 + Math.random() * 200,
      direction: Math.random() * 360,
      rotation: Math.random() > 0.5 ? 'right' : 'left',
      color: {
        red: Math.floor(Math.random() * 255),
        green: Math.floor(Math.random() * 255),
        blue: Math.floor(Math.random() * 255)
      },
      speed: Math.random() * 100,
      paint: Math.random() > 0.2 ? "endPosition" : undefined,
      childrens: [],
    }

    const childrens = Math.floor(Math.random() * childRemains);
    for (let i = 0; i < childrens; i++) {
      edgeSettings.childrens.push(this.getRandomChild(childRemains - 1));
    }

    return edgeSettings;
  }

  onClick(event){
    const edgeSettings = {
      x1: event.x,
      y1: event.y,
      length: 10 + Math.random() * 300,
      direction: Math.random() * 360,
      rotation: 'right',
      color: {
        red: Math.floor(Math.random() * 255),
        green: Math.floor(Math.random() * 255),
        blue: Math.floor(Math.random() * 255)
      },
      speed: Math.random() * 100,
      paint: Math.random() > 0.2 ? "endPosition" : undefined,
      childrens: []
    }

    const childrens = Math.floor(1 + Math.random() * 3);
    for (let i = 0; i < childrens; i++) {
      edgeSettings.childrens.push(this.getRandomChild(4));
    }

    const edge = new PsychoEdge(this.canvas, this.drawingCanvas, edgeSettings);
    this.sceneItems.push(edge);
  }

  update(delta) {
    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if(this.timer > this.maxTime){
      const drawingCtx = this.drawingCanvas.getContext("2d");
      drawingCtx.fillStyle = "rgba(0, 0, 0, 0.09)";
      drawingCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.timer %= this.maxTime;
    }

    this.timer += delta;
  }
};