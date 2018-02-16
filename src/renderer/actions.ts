import actionCreatorFactory from 'typescript-fsa'
import { Picture } from 'renderer/reducer'

export const RECEIVE_FILES = 'RECEIVE_FILES'

const actionCreator = actionCreatorFactory()

export const receiveFiles = actionCreator<Picture[]>(RECEIVE_FILES)