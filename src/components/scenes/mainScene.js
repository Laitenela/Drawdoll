import { Edge } from "@components/items/edge";
import { Scene } from "@modules/sceneObject";

export class MainScene extends Scene {
  constructor(appController) {
    super(appController);
  }

  onClick(event){
    console.log('mainScene', 'На месте');
    const edgeSettings = {
      x1: event.x,
      y1: event.y,
      length: 10 + Math.random() * 200,
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
      edgeSettings.childrens.push(this.getRandomChild(3));
    }

    const edge = new Edge(this.canvas, this.drawingCanvas, edgeSettings);
    this.sceneItems.push(edge);
  }
};