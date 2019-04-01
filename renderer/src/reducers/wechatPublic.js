import { ADD_WECHATPUBLIC_PROJECT, DEL_WECHATPUBLIC_PROJECT, DEL_ALL_WECHATPUBLIC_PROJECT } from '../types'

export default (state = [], { type, payload }) => {
  switch (type) {
    case ADD_WECHATPUBLIC_PROJECT:
      return [ ...state, payload ]
    case DEL_WECHATPUBLIC_PROJECT:
      return state.filter(repost => repost.index !== payload)
    case DEL_ALL_WECHATPUBLIC_PROJECT:
      return []
    default:
      return state
  }
}
