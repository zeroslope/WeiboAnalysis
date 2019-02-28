import { ADD_COMMENT_PROJECT, ADD_KEYWORD_PROJECT, ADD_REPOST_PROJECT, ADD_USER_PROJECT } from '../types'

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

export const addComment = data => dispatch => dispatch(addCommentProject(data))
export const addUser = data => dispatch => dispatch(addUserProject(data))
export const addKeyword = data => dispatch => dispatch(addKeywordProject(data))
export const addRepost = data => dispatch => dispatch(addRepostProject(data))
