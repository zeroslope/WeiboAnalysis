/** @jsx jsx */
// import { resolve } from '../helpers'
import { Component } from 'react'
import Layout from '../components/Layout'
import { jsx, css } from '@emotion/core' // eslint-disable-line
import { Tabs } from 'antd'

import CommentTab from '../components/form/CommentForm'
import RepostTab from '../components/form/RepostForm'
// import UserTab from '../components/form/UserForm'

import KeywordTab from '../components/form/KeywordForm'
import UserTab from '../components/tabs/UserTab'

const TabPane = Tabs.TabPane

// const w10 = css({
//   width: '10rem'
// })

class Index extends Component {
  render () {
    return (
      <Layout match={this.props.match}>
        <h2 className='silver ml3 mt3'>数据爬取</h2>
        <section className='relative overflow-hidden' css={{
          paddingTop: '1rem'
        }}>
          <Tabs tabPosition='left' className='pt3'>
            <TabPane tab='基于用户ID搜索' key='1'>
              <UserTab />
            </TabPane>
            <TabPane tab='基于关键词搜索' key='2'>
              <KeywordTab />
            </TabPane>
            <TabPane tab='用户转发信息获取' key='3'>
              <RepostTab />
            </TabPane>
            <TabPane tab='用户评论信息获取' key='4'>
              <CommentTab />
            </TabPane>
          </Tabs>
        </section>
      </Layout>
    )
  }
}

export default Index
