import { reducerWithInitialState } from 'typescript-fsa-reducers'
import * as actions from 'renderer/actions'
import { Path } from 'main/fileUtils'

export type Map<T> = {
  [key: string]: T
}

export type State = {
  path: null | Path
}

const INITIAL_STATE: State = {
  path: null
}
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(actions.receivePath, (state: State, path: Path) => ({
    ...state,
    path
  }))

export default reducer