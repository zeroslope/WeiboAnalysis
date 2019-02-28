import { combineReducers } from 'redux'
import user from './reducers/user'
import comment from './reducers/comment'
import repost from './reducers/repost'
import keyword from './reducers/keyword'

export default combineReducers({
  user,
  comment,
  repost,
  keyword
})
