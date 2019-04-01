import React, { Component } from 'react'
import { Statistic } from 'antd'
import { Link } from 'react-router-dom'
import WordCloud from '../components/utils/wordcloud'
import Pie from '../components/utils/pie'
import LineChart from '../components/utils/linechart'

const userMapper = {
  '-1': '普通用户',
  '0': '名人',
  '1': '政府',
  '2': '企业',
  '3': '媒体',
  '4': '校园',
  '5': '网站',
  '6': '应用',
  '7': '团体(机构)',
  '8': '待审企业',
  '200': '初级达人',
  '220': '中高级达人',
  '400': '已故V用户'
}

const typeMapper = {
  '-1': '用户抓取',
  '1': '综合抓取',
  '60': '热门抓取',
  '61': '实时抓取',
  '100': '微博转发',
  '101': '微博评论'
}

export class weibo extends Component {
  getWeibo = window.electron.remote.require('./getAnalyize').getWeibo || false;

  state = {
    weiboNum: 0,
    verifyType: [],
    followers: 0,
    keyCloud: [],
    timeline: []
  }

  componentWillMount () {
    console.log(this.props.match)
    //  console.log(this.props.location)
    if (this.getWeibo) {
      const { key, type } = this.props.match.params
      console.log(type, key)
      const P = new Promise((resolve, reject) => {
        resolve(this.getWeibo(type, key))
      }).then((data) => {
        // console.log(data)
        const weiboNum = data.weibo_num
        const followers = data.followers
        const timeline = data.timeline
          ? Object.keys(data.timeline).map(time => ({
            item: time,
            value: data.timeline[time]
          }))
          : []
        const verifyType = data.verify_type
          ? Object.keys(data.verify_type).map(type => ({
            item: userMapper[type],
            count: data.verify_type[type]
          }))
          : []
        const keyCloud = data.key
          ? Object.keys(data.key).map(x => ({
            x,
            value: data.key[x]
          }))
          : []
        this.setState({ weiboNum, timeline, followers, verifyType, keyCloud })
      })
    }
  }

  render () {
    const { key, type } = this.props.match.params
    const { weiboNum, timeline, followers, verifyType, keyCloud } = this.state
    return (
      <div className='pa2 vh-100'>
        <Link to='/record'>record</Link>
        <h1 className='ml4 mt0'>{`${typeMapper[type]}: ${key}`}</h1>
        <div className='flex flex-auto'>
          <Statistic title='微博数' value={weiboNum} className='ml4 ph4 pv3 ba' />
          <Statistic title='粉丝数' value={followers} className='ml5 ph4 pv3 ba' />
        </div>
        <div className='mt3'>
          <div className='dib w-50'>
            <h3 className='tc'>微博发布时间分布</h3>
            <LineChart data={timeline} />
          </div>
          <div className='dib w-50'>
            <h3 className='tc'>微博用户粉丝人群分布</h3>
            { verifyType.length > 0 && <Pie data={verifyType} /> }
          </div>
        </div>
        <div className='mt3'>
          <h3 className='tc'>关键词词云</h3>
          { keyCloud.length > 0 && <WordCloud data={keyCloud} /> }
        </div>
      </div>
    )
  }
}

export default weibo
