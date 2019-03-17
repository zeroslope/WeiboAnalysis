import { ADD_REPOST_PROJECT, DEL_REPOST_PROJECT } from '../types'

export default (state = [], { type, payload }) => {
  switch (type) {
    case ADD_REPOST_PROJECT:
      return [ ...state, payload ]
    case DEL_REPOST_PROJECT:
      return state.filter(repost => repost.index !== payload)
    default:
      return state
  }
}
