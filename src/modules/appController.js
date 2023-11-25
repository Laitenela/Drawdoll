export class AppController{
  scene;
  appManager;
  constructor(appManager){
    if(!appManager) throw new Error("There is has not appManager");

    this.appManager = appManager;
    this.appManager.bindController(this);
  }

  startScene(Scene){
    if(this.scene){
      this.scene.clear();
      this.appManager.removeScene(this.scene);
    }

    this.scene = new Scene(this.appManager);
    this.appManager.initializeScene(this.scene);
  }
};