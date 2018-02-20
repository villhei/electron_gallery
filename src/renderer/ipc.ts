import { IpcRenderer, IpcMessageEvent } from 'electron'
import { Dispatch } from 'react-redux'
import { State } from 'renderer/reducer'
import mockIpcRenderer from 'main/ipcRenderer'
import * as messages from 'main/messages'
import * as actions from 'renderer/actions'
import { Path, isImageFile } from 'main/fileUtils'

export const ipcRenderer: IpcRenderer =
  (<any>window).___electron ? (<any>window).___electron.ipcRenderer : mockIpcRenderer

export default function connectRenderer<State>(dispatch: Dispatch<State>) {
  ipcRenderer.on(messages.RECEIVE_PATH, (event: IpcMessageEvent, path: Path) => {
    console.log('path received', path)
    dispatch(actions.receivePath(path))
  })

  ipcRenderer.on(messages.RECEIVE_FILE_CONTENT, (event: IpcMessageEvent, name: string, data: ArrayBuffer) => {
    if (!(window as any).___imageData) {
      (window as any).___imageData = {}
    }
    (window as any).___imageData[name] = data
    dispatch(actions.receiveImageData({ name }))
  })
}

export function requestPath(path?: string): void {
  if (path) {
    ipcRenderer.send(messages.GET_PATH, path)
  } else {
    ipcRenderer.send(messages.GET_PATH)
  }
}