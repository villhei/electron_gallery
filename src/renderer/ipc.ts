import { IpcRenderer, IpcMessageEvent } from 'electron'
import { Dispatch } from 'react-redux'
import { State } from 'renderer/reducer'
import mockIpcRenderer from 'main/ipcRenderer'
import * as messages from 'main/messages'
import * as actions from 'renderer/actions'
import { Image } from 'renderer/reducer'
import { File, isImageFile } from 'main/fileUtils'

export const ipcRenderer: IpcRenderer =
  (<any>window).___electron ? (<any>window).___electron.ipcRenderer : mockIpcRenderer

export default function connectRenderer<State>(dispatch: Dispatch<State>) {
  ipcRenderer.on(messages.RECEIVE_FILES, (event: IpcMessageEvent, files: File[]) => {
    const images: Image[] = files
      .filter(file => isImageFile(file))
      .map((file: File) => {
        return {
          name: file.name,
          path: file.path,
          modified: file.modified,
          hasData: false
        }
      })
    dispatch(actions.receiveFiles(images))
    images.forEach((image) => {
      requestContents(image)
    })
  })

  ipcRenderer.on(messages.RECEIVE_FILE_CONTENT, (event: IpcMessageEvent, name: string, data: ArrayBuffer) => {
    if (!(window as any).___imageData) {
      (window as any).___imageData = {}
    }
    (window as any).___imageData[name] = data
    dispatch(actions.receiveImageData({ name }))
  })
}

export function requestFiles(): void {
  ipcRenderer.send(messages.GET_FILES)
}

export function requestContents(image: Image) {
  ipcRenderer.send(messages.READ_FILE_CONTENT, image.name, image.path)
}