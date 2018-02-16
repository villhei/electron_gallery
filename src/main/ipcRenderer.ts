import * as electron from 'electron'
import * as messages from 'main/messages'
import { Picture } from 'renderer/reducer'
import * as EventEmitter from 'eventemitter3'


const PICTURES_MOCK: Picture[] = [
  {
    name: 'islanti.jpg',
    modified: new Date().toISOString(),
    fileName: 'path/to/islanti.jpg'
  },
  {
    name: 'islanti.jpg',
    modified: new Date().toISOString(),
    fileName: 'path/to/islanti.jpg'
  },
  {
    name: 'islanti.jpg',
    modified: new Date().toISOString(),
    fileName: 'path/to/islanti.jpg'
  },
  {
    name: 'islanti.jpg',
    modified: new Date().toISOString(),
    fileName: 'path/to/islanti.jpg'
  },
  {
    name: 'islanti.jpg',
    modified: new Date().toISOString(),
    fileName: 'path/to/islanti.jpg'
  }, {
    name: 'islanti.jpg',
    modified: new Date().toISOString(),
    fileName: 'path/to/islanti.jpg'
  }
]

export interface ElectronEventEmitter extends EventEmitter {
  setMaxListeners: (n: number) => this
  getMaxListeners: () => number
  prependListener(event: string, listener: Function): this
  prependOnceListener(event: string, listener: Function): this
}
const emitter: ElectronEventEmitter = Object.assign(new EventEmitter(), {
  setMaxListeners: (n: number) => {
    return this
  },
  getMaxListeners: () => 0,
  prependListener: (event: string, listener: Function) => this,
  prependOnceListener: (event: string, listener: Function) => this
})

emitter.on(messages.GET_FILES, () => {
  emitter.emit(messages.RECEIVE_FILES, new Event('ipcEvent'), PICTURES_MOCK)
})

export default emitter as Electron.EventEmitter