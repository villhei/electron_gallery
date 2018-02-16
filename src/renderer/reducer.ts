import { reducerWithInitialState } from 'typescript-fsa-reducers'
import * as actions from 'renderer/actions'
export type Picture = {
  name: string,
  fileName: string
  modified: string
}

export type State = {
  pictures: Picture[]
}

const INITIAL_STATE: State = {
  pictures: []
}

const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(actions.receiveFiles, (state: State, pictures: Picture[]) => (
    { ...state, pictures }))
export default reducer