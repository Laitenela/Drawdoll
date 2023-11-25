import { DzenDot } from "@components/items/dzenDot";
import { Scene } from "@modules/sceneObject";

export class DottedScene extends Scene {
  constructor(appController) {
    super(appController);
  }

  initialize(){
    const context = this;
    function onClick(event){
      context.onClick(event)
    }
    this._onClick = onClick;
    this.canvas.addEventListener('mousedown', onClick);

    for(let i = 0; i < 300; i++){
      // this.canvas.width, this.canvas.height
      const dotSettings = {
        positionX: Math.random() * this.canvas.width,
        positionY: Math.random() * this.canvas.height,
        radius: 1,
      }
  
      const dot = new DzenDot(this.canvas, this.drawingCanvas, dotSettings);
      this.sceneItems.push(dot);
    }
  }

  onClick(event){
    const dotSettings = {
      positionX: event.x,
      positionY: event.y,
      radius: 2,
    }

    const dot = new DzenDot(this.canvas, this.drawingCanvas, dotSettings);
    this.sceneItems.push(dot);
  }

  update(delta) {
    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for(let i = 0; i < this.sceneItems.length; i++){
      for(let j = 0; j < this.sceneItems.length; j++){
        if(i === j) continue;

        const distance = this.#calculateDistanceBetween(
          this.sceneItems[i].position.x,
          this.sceneItems[i].position.y,
          this.sceneItems[j].position.x,
          this.sceneItems[j].position.y
        );

        if(distance < 100){
          ctx.beginPath();
          ctx.moveTo(this.sceneItems[i].position.x, this.sceneItems[i].position.y);
          ctx.lineTo(this.sceneItems[j].position.x, this.sceneItems[j].position.y);
          ctx.lineWidth = 1;
          ctx.strokeStyle = `rgba(255, 255, 255, ${(100 - distance) / 100})`;
          ctx.stroke();
        }
      }
    }
  }

  #calculateDistanceBetween(x1, y1, x2, y2){
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
  }
};