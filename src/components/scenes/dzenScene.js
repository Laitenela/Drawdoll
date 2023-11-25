import { DzenEdge } from "@components/items/dzenEdge";
import { Scene } from "@modules/sceneObject";

export class DzenScene extends Scene {
  constructor(appController) {
    super(appController);
  }

  onClick(event){
    console.log('dzenScene', 'На месте');
    const edgeSettings = {
      x1: event.x,
      y1: event.y,
      length: 0,
      direction: Math.random() * 360,
      rotation: 'left',
      color: {
        red: 255,
        green: 255,
        blue: 255
      },
      speed: 5 + Math.random() * 100,
      paint: "endPosition",
      childrens: [
      ]
    }

    const edge = new DzenEdge(this.canvas, this.drawingCanvas, edgeSettings);
    this.sceneItems.push(edge);
  }
};