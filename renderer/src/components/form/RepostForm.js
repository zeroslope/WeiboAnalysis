import React, { Component } from 'react'
import { Text } from '../utils'
import { Input, InputNumber, Button } from 'antd'

class RepostForm extends Component {
  ipcRenderer = window.electron.ipcRenderer || false
  state = {
    projectName: '',
    userId: '',
    pageNumber: 1
  }

  componentDidMount () {
    if (this.ipcRenderer) {
      this.ipcRenderer.on('search-by-repost', (event, data) => {
        window.alert(data)
      })
    }
  }

  componentWillUnmount () {
    if (this.ipcRenderer) {
      this.ipcRenderer.removeAllListeners('search-by-repost')
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handlePageNumberChange = val => this.setState({ pageNumber: val })

  handleSubmit = () => {
    if (this.ipcRenderer) {
      const { projectName: username, userId, pageNumber, isNeedImage } = this.state
      this.ipcRenderer.send('search-by-repost', {
        type: '1',
        username,
        userId,
        pageNumber,
        isNeedImage
      })
    }
  }

  render () {
    let { projectName, userId, pageNumber } = this.state
    return (
      <div className='pv2 ph3'>
        <h2 className='silver'>获取用户转发信息</h2>
        {/** 第一位：type = 1 第二位：用户名  第三位：用户id 第四位：爬取页码 第五位：是否要图片 */}
        <div>
          <div>
            <Text>项目名称</Text>
            <Input size='small' className='db mt1 w-10' value={projectName} name='projectName' onChange={this.handleChange} />
          </div>
          <div className='mt2'>
            <Text>用户ID</Text>
            <Input size='small' className='db mt1 w-10' value={userId} name='userId' onChange={this.handleChange} />
          </div>
          <div className='mt2'>
            <Text>转发页码</Text>
            <InputNumber size='small' className='db mt1' value={pageNumber} onChange={this.handlePageNumberChange} />
          </div>
          <Button size='small'
            className='ba mt3 ph2 f7 white link bg-animate bg-transparent hover-black hover-bg-white b'
            onClick={this.handleSubmit}
          >
              提交
          </Button>
        </div>
      </div>
    )
  }
}

export default RepostForm
