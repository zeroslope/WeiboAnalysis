import { ADD_COMMENT_PROJECT } from '../types'

export default (state = [], { type, payload }) => {
  switch (type) {
    case ADD_COMMENT_PROJECT:
      return [ ...state, payload ]
    default:
      return state
  }
}
