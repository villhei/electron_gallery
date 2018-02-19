import actionCreatorFactory from 'typescript-fsa'
import { Image } from 'renderer/reducer'

export const RECEIVE_FILES = 'RECEIVE_FILES'
export const RECEIVE_IMAGE_DATA = 'RECEIVE_IMAGE_DATA'

const actionCreator = actionCreatorFactory()

export type ReceiveImageData = {
  name: string
}

export const receiveFiles = actionCreator<Image[]>(RECEIVE_FILES)

export const receiveImageData = actionCreator<ReceiveImageData>(RECEIVE_IMAGE_DATA)