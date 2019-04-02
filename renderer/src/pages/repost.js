import React, { Component } from 'react'
import { Statistic, Skeleton } from 'antd'
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

export class repost extends Component {
  getWeibo = window.electron.remote.require('./getAnalyize').getWeibo || false;

  state = {
    repostNum: 0,
    verifyType: [],
    followers: 0,
    keyCloud: [],
    timeline: [],
    gender: [],
    loading: true
  }

  componentWillMount () {
    if (this.getWeibo) {
      const { key } = this.props.match.params
      // console.log(100, key)
      this.getWeibo(100, key)
        .then(data => {
          console.log(data)
          const repostNum = data.repost_num
          const followers = data.followers_count
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
          const gender = data.gender
            ? [{
              item: '男',
              count: data.gender.m
            }, {
              item: '女',
              count: data.gender.f
            }
            ]
            : []
          this.setState({ repostNum, timeline, followers, verifyType, keyCloud, gender, loading: false })
        })
    }
  }

  render () {
    const { key } = this.props.match.params
    const type = 100
    const { repostNum, timeline, followers, verifyType, keyCloud, gender, loading } = this.state
    return (
      <div className='pa2'>
        <h1 className='ml4 mt0'>{`${typeMapper[type]}: ${key}`}</h1>
        <Skeleton active loading={loading} title={false} paragraph={{ rows: 5 }}>
          <div className='flex flex-auto'>
            <Statistic title='转发数' value={repostNum} className='ml4 ph4 pv3 ba' />
            <Statistic title='粉丝数' value={followers} className='ml5 ph4 pv3 ba' />
          </div>
          <div className='mt3'>
            <div className='dib w-50'>
              <h3 className='tc'>转发时间分布</h3>
              <LineChart data={timeline} />
            </div>
            <div className='dib w-50'>
              <h3 className='tc'>转发人群认证类别分布</h3>
              { verifyType.length > 0 && <Pie data={verifyType} /> }
            </div>
          </div>
          <div className='mt3'>
            <div className='dib w-50'>
              <h3 className='tc'>转发人群性别分布</h3>
              { gender.length > 0 && <Pie data={gender} /> }
            </div>
          </div>
          <div className='mt3'>
            <h3 className='tc'>关键词词云</h3>
            { keyCloud.length > 0 && <WordCloud data={keyCloud} /> }
          </div>
        </Skeleton>
      </div>
    )
  }
}

export default repost
