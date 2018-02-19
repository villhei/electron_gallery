import { IpcRenderer } from 'electron'
import * as messages from 'main/messages'
import { Image } from 'renderer/reducer'
import * as EventEmitter from 'eventemitter3'


const PICTURES_MOCK: Image[] = [
  {
    name: 'islanti.jpg',
    modified: new Date().toISOString(),
    path: 'path/to/islanti.jpg'
  },
  {
    name: 'islanti.jpg',
    modified: new Date().toISOString(),
    path: 'path/to/islanti.jpg'
  },
  {
    name: 'islanti.jpg',
    modified: new Date().toISOString(),
    path: 'path/to/islanti.jpg'
  },
  {
    name: 'islanti.jpg',
    modified: new Date().toISOString(),
    path: 'path/to/islanti.jpg'
  },
  {
    name: 'islanti.jpg',
    modified: new Date().toISOString(),
    path: 'path/to/islanti.jpg'
  }, {
    name: 'islanti.jpg',
    modified: new Date().toISOString(),
    path: 'path/to/islanti.jpg'
  }
]

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
  sendTo: (windowId: number, channel: string, ...args: any[]): void => {},
  sendToHost: (channel: string, ...args: any[]) => this,
  eventNames: () => []
})

emitter.on(messages.GET_FILES, () => {
  emitter.emit(messages.RECEIVE_FILES, new Event('ipcEvent'), PICTURES_MOCK)
})

export default emitter as Electron.EventEmitter