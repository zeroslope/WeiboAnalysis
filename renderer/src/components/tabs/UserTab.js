import React, { Component } from 'react'
import { Text } from '../utils'
import { Switch, Input, InputNumber, Button } from 'antd'

class UserTab extends Component {
  ipcRenderer = window.electron.ipcRenderer || false
  state = {
    username: '',
    userId: '',
    pageNumber: 1,
    isNeedImage: false
  }

  componentDidMount () {
    if (this.ipcRenderer) {
      this.ipcRenderer.on('search-by-user', (event, data) => {
        window.alert(data)
      })
    }
  }

  componentWillUnmount () {
    if (this.ipcRenderer) {
      this.ipcRenderer.removeAllListeners('search-by-user')
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handlePageNumberChange = val => this.setState({ pageNumber: val })

  handleImageSwitch = (checked, e) => this.setState({ isNeedImage: checked })

  handleSubmit = () => {
    if (this.ipcRenderer) {
      const { username, userId, pageNumber, isNeedImage } = this.state
      this.ipcRenderer.send('search-by-user', {
        type: '1',
        username,
        userId,
        pageNumber,
        isNeedImage
      })
    }
  }

  render () {
    let { username, userId, pageNumber, isNeedImage } = this.state
    return (
      <div className='pv2 ph3'>
        <h2 className='silver'>基于用户ID搜索</h2>
        {/** 第一位：type = 1 第二位：用户名  第三位：用户id 第四位：爬取页码 第五位：是否要图片 */}
        <div>
          <div>
            <Text>用户名</Text>
            <Input size='small' className='db mt1 w-10' value={username} name='username' onChange={this.handleChange} />
          </div>
          <div className='mt2'>
            <Text>用户ID</Text>
            <Input size='small' className='db mt1 w-10' value={userId} name='userId' onChange={this.handleChange} />
          </div>
          <div className='mt2'>
            <Text>爬取页码</Text>
            <InputNumber size='small' className='db mt1' value={pageNumber} onChange={this.handlePageNumberChange} />
          </div>
          <div className='mt2'>
            <Text>是否爬取图片</Text>
            <Switch className='db mt1' checkedChildren='是' unCheckedChildren='否' checked={isNeedImage} onChange={this.handleImageSwitch} />
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

export default UserTab
