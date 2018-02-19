import * as Electron from 'electron'
import { Dispatch } from 'react-redux'
import { State } from 'renderer/reducer'
import mockIpcRenderer, { ElectronEventEmitter } from 'main/ipcRenderer'
import * as messages from 'main/messages'
import * as actions from 'renderer/actions'
import { Image } from 'renderer/reducer'
import { File, isImageFile } from 'main/fileUtils'

export const ipcRenderer: ElectronEventEmitter =
  (<any>window).___electron ? (<any>window).___electron.ipcRenderer : mockIpcRenderer

export default function connectRenderer<State>(dispatch: Dispatch<State>) {
  ipcRenderer.on(messages.RECEIVE_FILES, (event, files: File[]) => {
    console.log('received', files)
    const images: Image[] = files
      .filter(file => isImageFile(file))
      .map((file: File) => {
        return {
          name: file.name,
          path: file.path,
          modified: file.modified
        }
      })
    dispatch(actions.receiveFiles(images))
  })
}

export function requestFiles(): void {
  console.log('requesting files')
  ipcRenderer.send(messages.GET_FILES)
}