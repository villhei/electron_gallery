import { reducerWithInitialState } from 'typescript-fsa-reducers'
import * as actions from 'renderer/actions'

export type Image = {
  name: string,
  path: string
  modified: string
}

export type State = {
  pictures: Image[]
}

const INITIAL_STATE: State = {
  pictures: []
}

const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(actions.receiveFiles, (state: State, pictures: Image[]) => (
    { ...state, pictures }))
export default reducer