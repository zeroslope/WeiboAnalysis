import React, { Component } from 'react'
import { Statistic, Skeleton, Card } from 'antd'
import WordCloud from '../components/chart/wordcloud'
import Pie from '../components/chart/pie'
import { typeMapper, userMapper } from '../components/utils'
import getComponent from '../components/chart/linechart'

export class weibo extends Component {
  getWeibo = window.electron.remote.require('./getAnalyize').getWeibo || false;

  state = {
    weiboNum: 0,
    verifyType: [],
    followers: 0,
    keyCloud: [],
    timeline: [],
    loading: true
  }

  componentWillMount () {
    if (this.getWeibo) {
      const { key, type } = this.props.match.params
      this.getWeibo(type, key)
        .then((data) => {
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
          this.setState({ weiboNum, timeline, followers, verifyType, keyCloud, loading: false })
        })
    }
  }

  render () {
    const { key, type } = this.props.match.params
    const { weiboNum, timeline, followers, verifyType, keyCloud, loading } = this.state
    const SliderChart = getComponent(timeline)
    return (
      <div className='pa2 vh-100'>
        <h1 className='mt0'>{`${typeMapper[type]}: ${key}`}</h1>
        <Skeleton active loading={loading} title={false} paragraph={{ rows: 5 }}>
          <div className='flex flex-auto shadow-2'>
            <div className='w-50 tc'>
              <Statistic title='微博数' value={weiboNum} className='ph4 pv3 center' valueStyle={{
                color: '#1590FF'
              }} />
            </div>
            <div className='w-50 tc'>
              <Statistic title='粉丝数' value={followers} className='ph4 pv3 center' valueStyle={{
                color: '#1590FF'
              }} />
            </div>
          </div>
          <div className='mt3'>
            <Card
              size='small'
              title='微博发布频率'
              className='shadow-2 h-100'
            >
              <SliderChart />
            </Card>
            {/* <h3 className='tc'>微博发布频率</h3> */ }
          </div>
          {
            type !== '-1' &&
              <div className='mt3'>
                <Card
                  size='small'
                  title='粉丝认证类型分布'
                  className='shadow-2 h-100'
                >
                  { verifyType.length > 0 && <Pie data={verifyType} /> }
                </Card>
              </div>
          }
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
