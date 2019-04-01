import { ADD_COMMENT_PROJECT, DEL_COMMENT_PROJECT, DEL_ALL_COMMENT_PROJECT } from '../types'

export default (state = [], { type, payload }) => {
  switch (type) {
    case ADD_COMMENT_PROJECT:
      return [ ...state, payload ]
    case DEL_COMMENT_PROJECT:
      return state.filter(comment => comment.index !== payload)
    case DEL_ALL_COMMENT_PROJECT:
      return []
    default:
      return state
  }
}
