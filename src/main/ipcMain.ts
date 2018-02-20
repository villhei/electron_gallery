import { ipcMain, Event } from 'electron'
import { Stats } from 'fs'
import * as messages from './messages'
import * as fileUtils from './fileUtils'

type Path = fileUtils.Path

export default function configure(defaultPath: string) {
  ipcMain.on(messages.GET_PATH, (event: Event, pathname: string = defaultPath) => {
    console.log('request to read '  + pathname)
    fileUtils.getPath(pathname, 1)
      .then((path: Path) => {
        event.sender.send(messages.RECEIVE_PATH, path)
      })
  })

  ipcMain.on(messages.READ_FILE_CONTENT, (event: Event, name: string, path: string) => {
    fileUtils.readFileAsync(path).then((buffer: Buffer) => {
      event.sender.send(messages.RECEIVE_FILE_CONTENT, name, buffer)
    })
  })
}