/** @jsx jsx */
// import { resolve } from '../helpers'
import { Component } from 'react'
import Layout from '../components/Layout'
import { jsx, css } from '@emotion/core' // eslint-disable-line

import CommentTab from '../components/tabs/CommentTab'
import RepostTab from '../components/tabs/RepostTab'
import KeywordTab from '../components/tabs/KeywordTab'
import UserTab from '../components/tabs/UserTab'
import { Button } from 'antd'

// const w10 = css({
//   width: '10rem'
// })

class Index extends Component {
  render () {
    return (
      <Layout match={this.props.match}>
        <div className='flex justify-between items-center'>
          <h2 className='silver ml3 mt3'>数据爬取</h2>
          <Button type='primary' icon='cloud-download' className='mr3'>开始爬取</Button>
        </div>
        <section className='relative overflow-hidden ph3 pb3 pt2'>
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
