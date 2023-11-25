import { updater } from "./updater";

export class Scene {
  sceneItems;
  appController;
  drawingCanvas;
  maxTime = 5;
  timer = 0;
  canvas;
  constructor(appManager) {
    if (!appManager) throw new Error('There is has not controller');

    this.appManager = appManager;

    this.canvas = this.appManager.canvas;
    this.drawingCanvas = this.appManager.drawingCanvas;
    this.sceneItems = [];
  }

  initialize(){
    const context = this;
    function onClick(event){
      context.onClick(event)
    }
    this._onClick = onClick;
    this.canvas.addEventListener('mousedown', onClick);
  }

  onClick(event){

  }

  clear() {
    this.canvas.removeEventListener('mousedown', this._onClick);
    this.sceneItems = [];

    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  getRandomChild(childRemains) {
    const edgeSettings = {
      length: 10 + Math.random() * 100,
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

  update(delta) {
    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // if(this.timer > this.maxTime){
    //   const drawingCtx = this.drawingCanvas.getContext("2d");
    //   drawingCtx.fillStyle = "rgba(0, 0, 0, 0.09)";
    //   drawingCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    //   this.timer %= this.maxTime;
    // }

    // this.timer += delta;
  }
};