/** @jsx jsx */
// import { resolve } from '../helpers'
import { Component } from 'react'
import Layout from '../components/Layout'
import { jsx, css } from '@emotion/core' // eslint-disable-line

import WechatPublicTab from '../components/tabs/WechatPublicTab'
import { Tabs } from 'antd'

const TabPane = Tabs.TabPane

class Index extends Component {
  render () {
    return (
      <Layout match={this.props.match}>
        <h2 className='silver ml3 mt3'>微信数据爬取</h2>
        <Tabs tabPosition='top' className='relative overflow-hidden ph3 pb3 pt2'>
          <TabPane tab='微信公众号信息搜索' key='1'>
            <WechatPublicTab />
          </TabPane>
        </Tabs>
      </Layout>
    )
  }
}

export default Index
