import React, { Component } from 'react'
import { Statistic, Skeleton } from 'antd'
import WordCloud from '../components/chart/wordcloud'
import Pie from '../components/chart/pie'
import LineChart from '../components/chart/linechart'
import { typeMapper, userMapper } from '../components/utils'

export class weibo extends Component {
  getWeibo = window.electron.remote.require('./getAnalyize').getWeibo || false;

  state = {
    commentNum: 0,
    verifyType: [],
    likeCounts: 0,
    keyCloud: [],
    timeline: [],
    loading: true
  }

  componentWillMount () {
    // console.log(this.props.match)
    //  console.log(this.props.location)
    if (this.getWeibo) {
      const { key } = this.props.match.params
      // console.log(101, key)
      this.getWeibo(101, key)
        .then(data => {
          // console.log(data)
          const commentNum = data.comment_num
          const likeCounts = data.like_counts
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
          this.setState({ commentNum, timeline, likeCounts, verifyType, keyCloud, loading: false })
        })
    }
  }

  render () {
    const { key } = this.props.match.params
    const type = 101
    const { commentNum, timeline, likeCounts, verifyType, keyCloud, loading } = this.state
    return (
      <div className='pa2'>
        <h1 className='ml4 mt0'>{`${typeMapper[type]}: ${key}`}</h1>
        <Skeleton active loading={loading} title={false} paragraph={{ rows: 5 }}>
          <div className='flex flex-auto'>
            <Statistic title='评论数' value={commentNum} className='ml4 ph4 pv3 ba' />
            <Statistic title='总点赞数' value={likeCounts} className='ml5 ph4 pv3 ba' />
          </div>
          <div className='mt3'>
            <div className='dib w-50'>
              <h3 className='tc'>评论时间分布</h3>
              <LineChart data={timeline} />
            </div>
            <div className='dib w-50'>
              <h3 className='tc'>评论用户群体分布</h3>
              { verifyType.length > 0 && <Pie data={verifyType} /> }
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

export default weibo
