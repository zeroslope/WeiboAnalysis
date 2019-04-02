import { ADD_COMMENT_PROJECT, ADD_KEYWORD_PROJECT, ADD_REPOST_PROJECT, ADD_USER_PROJECT, DEL_USER_PROJECT, DEL_KEYWORD_PROJECT, DEL_REPOST_PROJECT, DEL_COMMENT_PROJECT, SET_SCRAPY } from '../types'
import {
  ADD_WECHATPUBLIC_PROJECT,
  DEL_WECHATPUBLIC_PROJECT
} from '../types'
import { 
  DEL_ALL_COMMENT_PROJECT, 
  DEL_ALL_KEYWORD_PROJECT, 
  DEL_ALL_REPOST_PROJECT, 
  DEL_ALL_USER_PROJECT, 
  DEL_ALL_WECHATPUBLIC_PROJECT 
} from '../types'

// Add things

export const addCommentProject = data => ({
  type: ADD_COMMENT_PROJECT,
  payload: data
})

export const addKeywordProject = data => ({
  type: ADD_KEYWORD_PROJECT,
  payload: data
})

export const addRepostProject = data => ({
  type: ADD_REPOST_PROJECT,
  payload: data
})

export const addUserProject = data => ({
  type: ADD_USER_PROJECT,
  payload: data
})

export const addWechatPublicProject = data => ({
  type: ADD_WECHATPUBLIC_PROJECT,
  payload: data
})

// Delete things

export const delUserProject = index => ({
  type: DEL_USER_PROJECT,
  payload: index
})

export const delKeywordProject = index => ({
  type: DEL_KEYWORD_PROJECT,
  payload: index
})

export const delRepostProject = index => ({
  type: DEL_REPOST_PROJECT,
  payload: index
})

export const delCommentProject = index => ({
  type: DEL_COMMENT_PROJECT,
  payload: index
})

export const delWechatPublicProject = index => ({
  type:DEL_WECHATPUBLIC_PROJECT,
  payload: index
})

// Delete All

export const delAllUserProject = () => ({
  type: DEL_ALL_USER_PROJECT,
})

export const delAllKeywordProject = () => ({
  type: DEL_ALL_KEYWORD_PROJECT,
})

export const delAllRepostProject = () => ({
  type: DEL_ALL_REPOST_PROJECT,
})

export const delAllCommentProject = () => ({
  type: DEL_ALL_COMMENT_PROJECT,
})

export const delAllWechatPublicProject = () => ({
  type: DEL_ALL_WECHATPUBLIC_PROJECT
})

export const addComment = data => dispatch => dispatch(addCommentProject(data))
export const addUser = data => dispatch => dispatch(addUserProject(data))
export const addKeyword = data => dispatch => dispatch(addKeywordProject(data))
export const addRepost = data => dispatch => dispatch(addRepostProject(data))
export const addWechatPublic = data => dispatch => dispatch(addWechatPublicProject(data))

export const delUser = index => dispatch => dispatch(delUserProject(index))
export const delKeyword = index => dispatch => dispatch(delKeywordProject(index))
export const delRepost = index => dispatch => dispatch(delRepostProject(index))
export const delComment = index => dispatch => dispatch(delCommentProject(index))
export const delWechatPublic = index => dispatch => dispatch(delWechatPublicProject(index))

export const setScrapyCreator = state => ({
  type: SET_SCRAPY,
  payload: state
})
export const setScrapy = state => dispatch => dispatch(setScrapyCreator(state))

// let a = ['User', 'Comment', 'Repost', 'WechatPublic', 'Keyword']
// a.forEach((val) => {
//   console.log(`export const delAll${val} = () => dispatch => dispatch(delAll${val}Project())`)
// })
export const delAllUser = () => dispatch => dispatch(delAllUserProject())
export const delAllComment = () => dispatch => dispatch(delAllCommentProject())
export const delAllRepost = () => dispatch => dispatch(delAllRepostProject())
export const delAllWechatPublic = () => dispatch => dispatch(delAllWechatPublicProject())
export const delAllKeyword = () => dispatch => dispatch(delAllKeywordProject())