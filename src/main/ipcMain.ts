import { ipcMain, Event } from 'electron'
import { Stats } from 'fs'
import * as messages from './messages'
import * as fileUtils from './fileUtils'

type File = fileUtils.File

export default function configure(defaultPath: string) {
  ipcMain.on(messages.GET_FILES, (event: Event, path?: string) => {
    fileUtils.fileDescriptionsInPath(path || defaultPath)
      .then((files: File[]) => {
        console.log('files', files)
        event.sender.send(messages.RECEIVE_FILES, files)
      })
  })
}