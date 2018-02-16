import * as Electron from 'electron'
import { Dispatch } from 'react-redux'
import { State } from 'renderer/reducer'
import mockIpcRenderer, { ElectronEventEmitter } from 'main/ipcRenderer'
import * as messages from 'main/messages'
import * as actions from 'renderer/actions'
import { Picture } from 'renderer/reducer'

export const ipcRenderer: ElectronEventEmitter =
  (<any>window).___electron ? (<any>window).___electron.ipcRenderer : mockIpcRenderer

export default function connectRenderer<State>(dispatch: Dispatch<State>) {
  ipcRenderer.on(messages.RECEIVE_FILES, (event, pictures: Picture[]) => {
    dispatch(actions.receiveFiles(pictures))
  })
}

export function requestFiles(): void {
  ipcRenderer.emit(messages.GET_FILES)
}