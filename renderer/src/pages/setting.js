import React, { Component } from 'react'
import Layout from '../components/Layout'
import { Button, Input, Icon } from 'antd'
const dialog = window.electron.remote.dialog
const os = window.electron.remote.require('os')

const Text = ({ children }) => (
  <span className='f6'>{children}</span>
)

class Setting extends Component {
  ipcRenderer = window.electron.ipcRenderer || false
  state = {
    certificate: '',
    password: '',
    isDisabled: true,
    imgPath: ''
  }

  componentDidMount () {
    let { certificate, password, imgPath } = window.localStorage
    certificate = certificate || ''
    password = password || ''
    if (imgPath === 'undefined' || !imgPath) imgPath = ''
    this.setState({
      certificate,
      password,
      imgPath,
      isDisabled: (!!certificate && !!password)
    })
  }

  componentWillUnmount () {
    if (this.ipcRenderer) {
      this.ipcRenderer.removeAllListeners('change-proxy')
      this.ipcRenderer.removeAllListeners('change-pic')
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  save = () => {
    if (this.ipcRenderer) {
      window.localStorage.certificate = this.state.certificate
      window.localStorage.password = this.state.password
      const { certificate, password } = this.state
      this.ipcRenderer.send('change-proxy', {
        certificate,
        password
      })
    }
    this.setState({ isDisabled: true })
  }

  saveImgPath = () => {
    if (this.ipcRenderer) {
      const imgPath = dialog.showOpenDialog({
        defaultPath: os.homedir(),
        title: '图片保存位置',
        buttonLabel: '确定',
        properties: ['openDirectory']
      })
      if (imgPath === '') return
      window.localStorage.imgPath = imgPath
      this.setState({
        imgPath
      })
      this.ipcRenderer.send('change-pic', {
        imgPath
      })
    }
  }

  edit = () => {
    this.setState({ isDisabled: false })
  }

  render () {
    const { certificate, password, isDisabled, imgPath } = this.state
    const setImgPath = (
      <Icon type='setting' onClick={this.saveImgPath} />
    )
    return (
      <Layout match={this.props.match}>
        <section className='relative overflow-hidden'>
          <div className='pa3'>
            <h2 className='silver'>代理设置</h2>
            <form onSubmit={this.handleSubmit}>
              <div>
                <Text>通行证书</Text>
                <Input size='small' className='db mt1 w5' value={certificate} name='certificate'
                  disabled={isDisabled}
                  onChange={this.handleChange}
                />
              </div>
              <div className='mt2'>
                <Text>通行密钥</Text>
                <Input.Password size='small' className='db mt1 w5' value={password} name='password' type='password'
                  disabled={isDisabled}
                  onChange={this.handleChange}
                />
              </div>
              <div className='mt3'>
                <Button size='small'
                  type='primary'
                  className='f7'
                  disabled={isDisabled}
                  onClick={this.save}>
                保存
                </Button>
                <Button size='small'
                  type='primary'
                  className='f7 ml3'
                  disabled={!isDisabled}
                  onClick={this.edit}>
                编辑
                </Button>
              </div>
            </form>
          </div>
          <div className='pl3'>
            <Text>图片保存位置</Text>
            <Input size='small' disabled className='db mt1 w-40' value={imgPath} addonAfter={setImgPath} name='imgPath' />
          </div>
        </section>
      </Layout>
    )
  }
}

export default Setting
