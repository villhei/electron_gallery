import actionCreatorFactory from 'typescript-fsa'
import { Image } from 'renderer/reducer'

export const RECEIVE_FILES = 'RECEIVE_FILES'

const actionCreator = actionCreatorFactory()

export const receiveFiles = actionCreator<Image[]>(RECEIVE_FILES)