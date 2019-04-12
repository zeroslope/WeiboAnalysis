import { ADD_USER_PROJECT, DEL_USER_PROJECT, DEL_ALL_USER_PROJECT } from '../types'

const initialState = []

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_USER_PROJECT:
      return [ ...state, payload ]
    case DEL_USER_PROJECT:
      return state.filter(user => user.index !== payload)
    case DEL_ALL_USER_PROJECT:
      return []
    default:
      return state
  }
}
