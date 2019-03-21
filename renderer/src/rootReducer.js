import { combineReducers } from 'redux'
import user from './reducers/user'
import comment from './reducers/comment'
import repost from './reducers/repost'
import keyword from './reducers/keyword'
import control from './reducers/control'

export default combineReducers({
  user,
  comment,
  repost,
  keyword,
  control
})
