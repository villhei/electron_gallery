import { ipcMain, Event } from 'electron'
import { Stats } from 'fs'
import * as messages from './messages'
import * as fileUtils from './fileUtils'

type File = fileUtils.File

export default function configure(defaultPath: string) {
  ipcMain.on(messages.GET_FILES, (event: Event, path?: string) => {
    fileUtils.fileDescriptionsInPath(path || defaultPath)
      .then((files: File[]) => {
        event.sender.send(messages.RECEIVE_FILES, files)
      })
  })

  ipcMain.on(messages.READ_FILE_CONTENT, (event: Event, name: string, path: string) => {
    fileUtils.readFileAsync(path).then((buffer: Buffer) => {
      event.sender.send(messages.RECEIVE_FILE_CONTENT, name, buffer)
    })
  })
}