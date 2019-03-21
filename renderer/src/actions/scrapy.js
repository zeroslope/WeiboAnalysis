import { ADD_COMMENT_PROJECT, ADD_KEYWORD_PROJECT, ADD_REPOST_PROJECT, ADD_USER_PROJECT, DEL_USER_PROJECT, DEL_KEYWORD_PROJECT, DEL_REPOST_PROJECT, DEL_COMMENT_PROJECT, SET_SCRAPY } from '../types'

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

export const addComment = data => dispatch => dispatch(addCommentProject(data))
export const addUser = data => dispatch => dispatch(addUserProject(data))
export const addKeyword = data => dispatch => dispatch(addKeywordProject(data))
export const addRepost = data => dispatch => dispatch(addRepostProject(data))

export const delUser = index => dispatch => dispatch(delUserProject(index))
export const delKeyword = index => dispatch => dispatch(delKeywordProject(index))
export const delRepost = index => dispatch => dispatch(delRepostProject(index))
export const delComment = index => dispatch => dispatch(delCommentProject(index))

export const setScrapyCreator = state => ({
  type: SET_SCRAPY,
  payload: state
})
export const setScrapy = state => dispatch => dispatch(setScrapyCreator(state))
