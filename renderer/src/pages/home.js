/** @jsx jsx */
// import { resolve } from '../helpers'
import { Component } from 'react'
import Layout from '../components/Layout'
import { jsx, css } from '@emotion/core' // eslint-disable-line
import { Tabs } from 'antd'

import CommentTab from '../components/tabs/CommentTab'
import RepostTab from '../components/tabs/RepostTab'
import KeywordTab from '../components/tabs/KeywordTab'
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
        <section className='relative overflow-hidden ph3' css={{
          paddingTop: '1rem'
        }}>
          <div className='shadow-4 br2'>
            <UserTab />
          </div>
          <div className='mt3 shadow-4 br2'>
            <KeywordTab />
          </div>
          <div className='mt3 shadow-4 br2'>
            <RepostTab />
          </div>
          <div className='mt3 shadow-4 br2'>
            <CommentTab />
          </div>
        </section>
      </Layout>
    )
  }
}

export default Index
