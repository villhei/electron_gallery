import * as Electron from 'electron'
import * as messages from 'main/messages'
import { Path, Directory, File, } from 'main/fileUtils'
import * as EventEmitter from 'eventemitter3'
import * as iceland from 'renderer/iceland.jpg'

const modified = new Date().toISOString()
const created = new Date().toISOString()
const MOCK_FILE: File = {
  name: 'islanti.jpg',
  modified,
  created,
  path: '/path/to/islanti.jpg',
  size: 41421421,
  isFile: true,
  isDirectory: false,
  url: iceland,
}

const MOCK_DIRECTORY: Directory = {
  path: '/path/to/',
  modified,
  created,
  isDirectory: true,
  isFile: false,
  children: [MOCK_FILE]
}

const emitter: Electron.IpcRenderer = Object.assign(new EventEmitter(), {
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

emitter.on(messages.GET_PATH, (path?: string) => {
  if (path && path === '/path/to/islanti.jpg') {
    emitter.emit(messages.RECEIVE_PATH, ipcEvent, MOCK_FILE)
  } else {
    emitter.emit(messages.RECEIVE_PATH, ipcEvent, MOCK_DIRECTORY)
  }
})

emitter.on(messages.READ_FILE_CONTENT, (name: string, path: string) => {
  fetch(iceland).then((response) => response.arrayBuffer()).then((buffer) => {
    emitter.emit(messages.RECEIVE_FILE_CONTENT, ipcEvent, name, buffer)
  })
})

export default emitter