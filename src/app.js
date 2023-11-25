import { DzenScene } from "@components/scenes/dzenScene";
import { MainScene } from "@components/scenes/mainScene";
import { PsychoScene } from "@components/scenes/psychoScene";
import { DottedScene } from "@components/scenes/dottedScene";


export const startApp = (appController) => {
  const mainScene = document.getElementById('main-scene');
  const dzenScene = document.getElementById('dzen-scene');
  const psychoScene = document.getElementById('psyco-scene');
  const dotsScene = document.getElementById('dots-scene');

  mainScene.addEventListener('mousedown', () => {
    appController.startScene(MainScene);
  })

  dzenScene.addEventListener('mousedown', () => {
    appController.startScene(DzenScene);
  })

  psychoScene.addEventListener('mousedown', () => {
    appController.startScene(PsychoScene);
  })

  dotsScene.addEventListener('mousedown', () => {
    appController.startScene(DottedScene);
  })

  appController.startScene(DottedScene);
}



// class AppController{
//   app;
//   canvas;
//   appManager;
//   constructor(appManager){
//     this.appManager = appManager;
//     this.app = appManager.app;
//     this.canvas = appManager.canvas;
//   }

//   //TODO: добавить типы контроллеров
//   createControllers(type, options){
//     const clientController = new ClientController(options);
//     clientController.initialize();
//     return clientController;
//   }

//   pushElement(element){
//     this.app.appendChild(element);
//   }
// }


// class ClientController{
//   element;
//   defaultOptions = {
    
//   };
  
//   options = {};

//   constructor(options){
//     this.options = {};

//     Object.assign(this.options, this.defaultOptions);
//     if(typeof options === 'object') Object.assign(this.options, options);
//   }

//   // TODO: Сделать инициализацию с параметрами
//   initialize(){
//     this.element = document.createElement('div');
//   }
// }