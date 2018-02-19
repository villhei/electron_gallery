import { IpcRenderer } from 'electron'
import * as messages from 'main/messages'
import { File } from 'main/fileUtils'
import * as EventEmitter from 'eventemitter3'
import * as iceland from 'renderer/iceland.jpg'

const MOCK_FILE: File = {
  name: 'islanti.jpg',
  modified: new Date().toISOString(),
  created: new Date().toISOString(),
  path: 'path/to/islanti.jpg',
  url: 'path/to/islanti.jpg',
  size: 4910249210,
  isFile: true,
  isDirectory: false
}

const FILES_MOCK: File[] = [MOCK_FILE]

const emitter: IpcRenderer = Object.assign(new EventEmitter(), {
  setMaxListeners: (n: number) => {
    return this
  },
  send: (event: string, ...args: any[]) => { emitter.emit(event, ...args) },
  sendSync: (event: string, ...args: any[]) => { emitter.emit(event, ...args) },
  getMaxListeners: () => 0,
  prependListener: (event: string, listener: Function) => this,
  prependOnceListener: (event: string, listener: Function) => this,
  removeListener: (channel: string, listener: Function) => this,
  removeAllListeners: (channel: string) => this,
  sendTo: (windowId: number, channel: string, ...args: any[]): void => { },
  sendToHost: (channel: string, ...args: any[]) => this,
  eventNames: () => []
})

const ipcEvent = new Event('ipcEvent')

emitter.on(messages.GET_FILES, () => {
  emitter.emit(messages.RECEIVE_FILES, ipcEvent, FILES_MOCK)
})

emitter.on(messages.READ_FILE_CONTENT, (name: string, path: string) => {
  fetch(iceland).then((response) => response.arrayBuffer()).then((buffer) => {
    emitter.emit(messages.RECEIVE_FILE_CONTENT, ipcEvent, name, buffer)
  })
})

export default emitter as Electron.EventEmitter