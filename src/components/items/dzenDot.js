import { CanvasItemObject } from "@modules/canvasItemObject";
import { mousePosition } from "@modules/mousePosition";

export class DzenDot extends CanvasItemObject {
  color;
  direction;
  radius;
  position;
  direction = (Math.random() * 360) * Math.PI / 180;
  changeDirection = 0.01;

  constructor(canvas, drawingCanvas, settings) {
    super(canvas, drawingCanvas);
    this.settings = settings;
    this.position = {
      x: settings.positionX,
      y: settings.positionY,
    }

    this.radius = settings.radius;

    // this.speed = settings.speed;
    // this.paint = settings.paint;
    // this.color = settings.color;
  }

  draw() {
    const ctx = this.canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, true);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fill();

    for(let i = 0; i < 5; i++){
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.radius + i * 0.3, 0, 2 * Math.PI, true);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fill();
    }

    const distanceToMouse = this.#calculateDistanceToMouse();

    if(distanceToMouse < 100){
      ctx.beginPath();
      ctx.moveTo(this.position.x, this.position.y);
      ctx.lineTo(mousePosition.x, mousePosition.y);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(255, 255, 255, ${(100 - distanceToMouse) / 100})`;
      ctx.stroke();
    }
  }

  update(delta) {
    const distanceToMouse = this.#calculateDistanceToMouse();
    this.changeDirection = (this.changeDirection + Math.random() / 500 - (1 / 1000)) % 0.01;
    this.direction = (this.direction + this.changeDirection) % (Math.PI);

    this.position.y += Math.sin(this.direction) * 0.1;
    this.position.x += Math.cos(this.direction) * 0.1;

    if(distanceToMouse < 100){
      const angle = this.#angleRad(this.position.x, this.position.y, mousePosition.x, mousePosition.y);
      this.direction = angle;
      this.position.y += Math.sin(angle) * (100 - distanceToMouse) ** 1.5 / 1000;
      this.position.x += Math.cos(angle) * (100 - distanceToMouse) ** 1.5 / 1000;
    }
  }

  #angleRad(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    if (theta < 0) theta = 360 + theta;
    return theta * Math.PI / 180;
  }

  #calculateDistanceToMouse(){
    return Math.sqrt((this.position.x - mousePosition.x) ** 2 + (this.position.y - mousePosition.y) ** 2)
  }
}