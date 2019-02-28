import { ADD_USER_PROJECT } from '../types'

export default (state = [], { type, payload }) => {
  switch (type) {
    case ADD_USER_PROJECT:
      return [ ...state, payload ]
    default:
      return state
  }
}
