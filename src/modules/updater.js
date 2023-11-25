class Updater{
  interval;
  lastUpdate;
  intervalTime;
  updaterItems = {};
  firstUpdaterItems = {};
  constructor(intervalTime){
    this.updaterItems = {};
    this.intervalTime = intervalTime;
  }

  addToFirst(unicueId, updateFunction, context){
    this.firstUpdaterItems[unicueId] = {updateFunction, context};
  }

  add(unicueId, updateFunction, context){
    this.updaterItems[unicueId] = {updateFunction, context};
  }

  start(){
    clearInterval(this.interval);
    this.lastUpdate = Date.now();
    this.interval = setInterval(() => this.#update(), this.intervalTime);
  }

  #update(){
    const currentTime = Date.now();
    const delta = (currentTime - this.lastUpdate) / this.intervalTime;
    this.lastUpdate = currentTime;

    const firstUpdaterKeys = Object.keys(this.firstUpdaterItems);
    for(const updaterKey of firstUpdaterKeys){
      const updateFunction = this.firstUpdaterItems[updaterKey].updateFunction;
      const functionContext = this.firstUpdaterItems[updaterKey].context;

      updateFunction.apply(functionContext, [delta]);
    }

    const updaterKeys = Object.keys(this.updaterItems);
    for(const updaterKey of updaterKeys){
      const updateFunction = this.updaterItems[updaterKey].updateFunction;
      const functionContext = this.updaterItems[updaterKey].context;

      updateFunction.apply(functionContext, [delta]);
    }
  }

  stop(){
    clearInterval(this.interval);
  }

  remove(unicueId){
    delete this.updaterItems[unicueId];
  }

  removeAll(){
    this.firstUpdaterItems = {};
    this.updaterItems = {};
  }
}

export const updater = new Updater(16.6);