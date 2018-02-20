import actionCreatorFactory from 'typescript-fsa'
import { Path, Directory } from 'main/fileUtils'

export const RECEIVE_PATH = 'RECEIVE_PATH'
export const RECEIVE_IMAGE_DATA = 'RECEIVE_IMAGE_DATA'
export const RECEIVE_DIRECTORY_LISTING = 'RECEIVE_DIRECTORY_LISTING'

const actionCreator = actionCreatorFactory()

export type ReceiveImageData = {
  name: string
}

export const receivePath = actionCreator<Path>(RECEIVE_PATH)

export const receiveImageData = actionCreator<ReceiveImageData>(RECEIVE_IMAGE_DATA)

export const receiveDirectoryListing = actionCreator<Directory>(RECEIVE_DIRECTORY_LISTING)
