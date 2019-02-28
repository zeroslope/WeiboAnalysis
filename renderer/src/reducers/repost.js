import { ADD_REPOST_PROJECT } from '../types'

export default (state = [], { type, payload }) => {
  switch (type) {
    case ADD_REPOST_PROJECT:
      return [ ...state, payload ]
    default:
      return state
  }
}
