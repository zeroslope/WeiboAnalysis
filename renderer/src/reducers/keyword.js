import { ADD_KEYWORD_PROJECT, DEL_KEYWORD_PROJECT, DEL_ALL_KEYWORD_PROJECT } from '../types'

export default (state = [], { type, payload }) => {
  switch (type) {
    case ADD_KEYWORD_PROJECT:
      return [ ...state, payload ]
    case DEL_KEYWORD_PROJECT:
      return state.filter(keyword => keyword.index !== payload)
    case DEL_ALL_KEYWORD_PROJECT:
      return []
    default:
      return state
  }
}
