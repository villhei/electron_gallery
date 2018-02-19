
import * as electron from 'electron'
import configureIpc from './main/ipcMain'

import { app, BrowserWindow } from 'electron'

function initMain(): Promise<Electron.BrowserWindow> {
  return new Promise((resolve, reject) => {
    app.on('window-all-closed', function () {
      if (process.platform != 'darwin') {
        app.quit();
      }
    });

    app.on('ready', function () {
      const main = new BrowserWindow({
        title: 'Image gallery',
        width: 800,
        height: 600
      })
      main.loadURL('http://localhost:1234')
      resolve(main)
    })
  })
}
configureIpc(app.getPath('pictures'))
const mainWindow = initMain()

mainWindow.then((window: Electron.BrowserWindow) => {
})