import './style.css';
import { startApp } from './src/app';
import { appSettings, canvasSettings } from './appSettings';
import { AppController } from '@modules/appController';
import { AppManager } from '@modules/appManager';

const app = document.getElementById('app');

const appManager = new AppManager(
  app,
  appSettings,
  canvasSettings
)

export const appController = new AppController(appManager);

startApp(appController);