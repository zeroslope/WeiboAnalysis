import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './pages/home'
import Hello from './pages/hello'
import Wechat from './pages/wechat'
import Record from './pages/record'
import Setting from './pages/setting'
import Weibo from './pages/weibo'
import Comment from './pages/comment'
import Repost from './pages/repost'

export default () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/wechat' component={Wechat} />
      <Route exact path='/record' component={Record} />
      <Route exact path='/setting' component={Setting} />
      <Route exact path='/weibo/:type/:key' component={Weibo} />
      <Route exact path='/comment/:key' component={Comment} />
      <Route exact path='/repost/:key' component={Repost} />
      <Route component={() => <h1>204 No Content</h1>} />
    </Switch>
  )
}
