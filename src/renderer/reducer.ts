import { reducerWithInitialState } from 'typescript-fsa-reducers'
import * as actions from 'renderer/actions'


export type Map<T> = {
  [key: string]: T
}

export type ModelEntry<T> = {
  byId: Map<T>,
  all: string[]
}
export type Image = {
  name: string,
  path: string
  modified: string,
  hasData: boolean
}

export type State = {
  imageDescriptions: ModelEntry<Image>
}

const INITIAL_STATE: State = {
  imageDescriptions: {
    byId: {},
    all: []
  }
}

const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(actions.receiveFiles, (state: State, images: Image[]) => {
    const all = images.map(({ name }) => name)
    const byId: Map<Image> = images.reduce(
      (acc, image: Image) => {
        return {
          ...acc,
          [image.name]: image
        }
      }, {})
    const imageDescriptions = {
      byId,
      all
    }
    return { ...state, imageDescriptions }
  })
  .case(actions.receiveImageData, (state: State, { name }) => {
    const { byId } = state.imageDescriptions
    const image = byId[name]
    const updatedImage = {
      ...image,
      hasData: true
    }
    const updatedState = {
      ...state,
      imageDescriptions: {
        ...state.imageDescriptions,
        byId: {
          ...byId,
          [name]: updatedImage
        }
      }
    }
    return updatedState
  })
export default reducer