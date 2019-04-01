import { ADD_USER_PROJECT, DEL_USER_PROJECT, DEL_ALL_USER_PROJECT } from '../types'

const initialState = [
  {
    index: 0,
    isNeedImage: false,
    pageNumber: 4,
    userId: '1729332983',
    username: '复旦大学'
  },
  {
    index: 1,
    isNeedImage: false,
    pageNumber: 4,
    userId: '1729332983',
    username: '复旦大学'
  },
  {
    index: 2,
    isNeedImage: false,
    pageNumber: 4,
    userId: '1729332983',
    username: '复旦大学'
  },
  {
    index: 3,
    isNeedImage: false,
    pageNumber: 4,
    userId: '1729332983',
    username: '复旦大学'
  }
]

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
