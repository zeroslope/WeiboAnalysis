import { ADD_KEYWORD_PROJECT } from '../types'

export default (state = [], { type, payload }) => {
  switch (type) {
    case ADD_KEYWORD_PROJECT:
      return [ ...state, payload ]
    default:
      return state
  }
}
