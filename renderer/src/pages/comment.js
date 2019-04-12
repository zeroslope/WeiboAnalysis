import React, { Component } from 'react'
import { Statistic, Skeleton, Card } from 'antd'
import WordCloud from '../components/chart/wordcloud'
import Pie from '../components/chart/pie'
import getComponent from '../components/chart/linechart'
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
    if (this.getWeibo) {
      const { key } = this.props.match.params
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
    const SliderChart = getComponent(timeline)
    return (
      <div className='pa2'>
        <h1 className='ml4 mt0'>{`${typeMapper[type]}: ${key}`}</h1>
        <Skeleton active loading={loading} title={false} paragraph={{ rows: 5 }}>
          <div className='flex flex-auto'>
            <Statistic title='评论数' value={commentNum} className='ph4 pv3 shadow-2' />
            <Statistic title='总点赞数' value={likeCounts} className='ml5 ph4 pv3 shadow-2' />
          </div>
          <div className='mt3 flex flex-auto justify-between'>
            <div className='dib w-48'>
              <Card
                size='small'
                title='评论时间分布'
                className='shadow-2 h-100'
              >
                <SliderChart />
              </Card>
            </div>
            <div className='dib w-48'>
              <Card
                size='small'
                title='评论用户群体分布'
                className='shadow-2 h-100'
              >
                { verifyType.length > 0 && <Pie data={verifyType} /> }
              </Card>
            </div>
          </div>
          <div className='mt3'>
            <Card
              size='small'
              title='关键词词云'
              className='shadow-2'
            >
              { keyCloud.length > 0 && <WordCloud data={keyCloud} /> }
            </Card>
          </div>
        </Skeleton>
      </div>
    )
  }
}

export default weibo
