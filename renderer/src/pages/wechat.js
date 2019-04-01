import React, { Component } from 'react'
import Layout from '../components/Layout'

export class wechat extends Component {
  static propTypes = {

  }

  render () {
    return (
      <Layout match={this.props.match}>
        <h2 className='silver ml3 mt3'>微信数据爬取</h2>
      </Layout>
    )
  }
}

export default wechat
