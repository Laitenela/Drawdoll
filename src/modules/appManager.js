import { updater } from "./updater";

export class AppManager{
  app;
  canvas;
  appSettings;
  canvasSettings;
  #appController;
  #updater;
  
  constructor(app, appSettings, canvasSettings){
    if(!app) throw new Error('There is not has appElement');

    this.app = app;

    this.appSettings = appSettings;
    this.canvasSettings = canvasSettings;

    this.#initializeApp();
    this.#initializeCanvas();
    this.#initializeDrawingCanvas();
    this.#setUpdater();
  }

  #setUpdater(){
    this.#updater = updater;
    this.#updater.start();
  }

  bindController(controller){
    this.#appController = controller;
  }

  #clearCanvas(){
    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  #clearDrawingCanvas(){
    const ctx = this.drawingCanvas.getContext("2d");
    ctx.clearRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
  }

  #initializeCanvas(){
    if(!this.canvasSettings?.width) throw new Error('There is has not canvasWidth');
    if(!this.canvasSettings?.height) throw new Error('There is has not canvasHeight');

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'main-canvas';
    this.canvas.width = this.canvasSettings.width;
    this.canvas.height = this.canvasSettings.height;
    this.canvas.innerHTML = "Canvas Element";

    this.appendToApp(this.canvas);
  }

  #initializeDrawingCanvas(){
    if(!this.canvasSettings?.width) throw new Error('There is has not canvasWidth');
    if(!this.canvasSettings?.height) throw new Error('There is has not canvasHeight');

    this.drawingCanvas = document.createElement('canvas');
    this.drawingCanvas.id = 'drawing-canvas';
    this.drawingCanvas.width = this.canvasSettings.width;
    this.drawingCanvas.height = this.canvasSettings.height;
    this.drawingCanvas.innerHTML = "Canvas Drawing Element";

    this.appendToApp(this.drawingCanvas);
  }

  initializeScene(scene){
    scene.initialize();
    this.#updater.addToFirst("__scene", scene.update, scene);
  }

  removeScene(scene){
    scene.clear();
    this.#updater.removeAll();
    this.#clearCanvas();
    this.#clearDrawingCanvas();
  }

  appendToApp(element){
    this.app.appendChild(element);
  }

  #initializeApp(){

  }
}