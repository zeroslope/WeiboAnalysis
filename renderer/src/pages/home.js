/** @jsx jsx */
// import { resolve } from '../helpers'
import { Component } from 'react'
import Layout from '../components/Layout'
import { jsx, css } from '@emotion/core' // eslint-disable-line

import CommentTab from '../components/tabs/CommentTab'
import RepostTab from '../components/tabs/RepostTab'
import KeywordTab from '../components/tabs/KeywordTab'
import UserTab from '../components/tabs/UserTab'
import { Tabs } from 'antd'

// const w10 = css({
//   width: '10rem'
// })

const TabPane = Tabs.TabPane

class Index extends Component {
  render () {
    return (
      <Layout match={this.props.match}>
        <h2 className='silver ml3 mt3'>微博数据</h2>
        <Tabs tabPosition='top' className='relative overflow-hidden ph3 pb3 pt2'>
          <TabPane tab='用户ID' key='1'>
            <UserTab />
          </TabPane>
          <TabPane tab='关键词' key='2'>
            <KeywordTab />
          </TabPane>
          <TabPane tab='转发信息' key='3'>
            <RepostTab />
          </TabPane>
          <TabPane tab='评论信息' key='4'>
            <CommentTab />
          </TabPane>
        </Tabs>
      </Layout>
    )
  }
}

export default Index
